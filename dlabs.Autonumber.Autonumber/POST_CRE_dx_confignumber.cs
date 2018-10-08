using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Linq;
using System.Runtime.Serialization;

namespace Dlabs_Autonumber
{
    public class POST_CRE_dx_confignumber : IPlugin
    {
        #region Secure/Unsecure Configuration Setup
        private string _secureConfig = null;
        private string _unsecureConfig = null;

        public POST_CRE_dx_confignumber(string unsecureConfig, string secureConfig)
        {
            _secureConfig = secureConfig;
            _unsecureConfig = unsecureConfig;
        }
        #endregion

        const string _MasterPluginName = "Dlabs_Autonumber.";

        public void Execute(IServiceProvider serviceProvider)
        {


            ITracingService tracer = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);

            try
            {
                var _parametros = new Parametros();

                Entity entity = (Entity)context.InputParameters["Target"];
               

                if (!entity.Contains("dx_entityname")) return;

                var _pluginName = $"{_MasterPluginName}{entity.Attributes["dx_entityname"].ToString()}";


                using (CrmServiceContext _context = new CrmServiceContext(service))
                {
                    if (_context.CreateQuery("sdkmessageprocessingstep").
                        Where(s => s.GetAttributeValue<string>("name").Equals(_pluginName)).ToList().Any()) {
                        return;
                    }

                    _parametros.o_Config = new ConfigAutonumber()
                    {
                        s_EntityName = entity.Attributes["dx_entityname"].ToString(),
                        s_EventName = ((OptionSetValue)entity.Attributes["event"]).Value == 425420000 ? "Create" : "Update"
                    };

                    _parametros.g_PluginTypeId = _context.CreateQuery("plugintype")
                                                                        .Where(s => s.GetAttributeValue<string>("name").Equals(typeof(POST_CRE_Set_Number).FullName))
                                                                       .Select(s => s.GetAttributeValue<Guid>("plugintypeid"))
                                                                       .First();

                    _parametros.g_MessageId = _context.CreateQuery("sdkmessage")
                                                                    .Where(s => s.GetAttributeValue<string>("name").Equals(_parametros.o_Config.s_EventName))
                                                                    .Select(s => s.GetAttributeValue<Guid>("sdkmessageid"))
                                                                    .First();

                    _parametros.g_FilterId = _context.CreateQuery("sdkmessagefilter")
                                                                   .Where(s => s.GetAttributeValue<string>("primaryobjecttypecode").Equals(_parametros.o_Config.s_EntityName)
                                                                       && s.GetAttributeValue<EntityReference>("sdkmessageid").Id.Equals(_parametros.g_MessageId))
                                                                   .Select(s => s.GetAttributeValue<Guid>("sdkmessagefilterid"))
                                                                   .First();
                }

                Entity _entity = new Entity("sdkmessageprocessingstep");
                _entity.Attributes["name"] = _pluginName;
                _entity.Attributes["description"] = _pluginName;
                _entity.Attributes["plugintypeid"] = new EntityReference("plugintype", _parametros.g_PluginTypeId);
                _entity.Attributes["sdkmessageid"] = new EntityReference("sdkmessage", _parametros.g_MessageId);
                _entity.Attributes["configuration"] = _parametros.o_Config.ToJson();
                _entity.Attributes["stage"] = PipelineStage.PreOperation.ToOptionSetValue();
                _entity.Attributes["rank"] = 1;
                _entity.Attributes["impersonatinguserid"] = new EntityReference("systemuser", context.UserId);
                _entity.Attributes["sdkmessagefilterid"] = new EntityReference("sdkmessagefilter", _parametros.g_FilterId);

                var g_newconfig = service.Create(_entity);

            }
            catch (Exception e)
            {
                
            }
        }
    }

    
    public class ConfigAutonumber
    {
    
        public string s_EntityName;

    
        public string s_EventName;
    }
}