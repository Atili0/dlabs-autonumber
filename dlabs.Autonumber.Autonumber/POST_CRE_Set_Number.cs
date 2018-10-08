using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Linq;

namespace Dlabs_Autonumber
{
    public class POST_CRE_Set_Number : IPlugin
    {
        #region Secure/Unsecure Configuration Setup
        private string _secureConfig = null;
        private string _unsecureConfig = null;

        public POST_CRE_Set_Number(string unsecureConfig, string secureConfig)
        {
            _secureConfig = secureConfig;
            _unsecureConfig = unsecureConfig;
        }
        #endregion
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

                using (CrmServiceContext _context = new CrmServiceContext(service))
                {
                    _parametros.o_Entity = (from auto in _context.dx_confignumberSet
                             where auto.dx_entityname == context.PrimaryEntityName
                             select auto).FirstOrDefault();
                }

                var _prefix = _parametros.o_Entity.dx_prefix.ToString();
                var _subffix = _parametros.o_Entity.dx_suffix.ToString();
                var _incremen = _parametros.o_Entity.dx_increment.Value;
                var _length = _parametros.o_Entity.dx_length.Value;
                var _currentNumber = _parametros.o_Entity.dx_currentnumber.ToString();

                var _nextnumber = 0;
                if (_parametros.o_Entity.dx_nextnumber != null)
                    _nextnumber = _parametros.o_Entity.dx_nextnumber.Value + _incremen;
                else
                    _nextnumber += _incremen;

                var _completeNumber = $"{_prefix}{_nextnumber.ToString().PadLeft(_length, '0')}{_subffix}";

                _parametros.o_Entity.Attributes[_parametros.o_Entity.dx_fieldname] = _completeNumber;
                service.Update(_parametros.o_Entity);
            }
            catch (Exception e)
            {
                throw new InvalidPluginExecutionException(e.Message);
            }
        }
    }
}