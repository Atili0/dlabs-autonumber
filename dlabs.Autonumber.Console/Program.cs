using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dx_early;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Tooling.Connector;

using ColorConsole;

namespace Dxrm.Autonumber.Console
{
    class Program
    {
        static void Main(string[] args)
        {
            UpdateAutonumber();
        }

        private static void UpdateAutonumber()
        {
            GetSettingsAutonumber();
        }

        private static void GetSettingsAutonumber()
        {
            var console = new ConsoleWriter();

            IOrganizationService service = null;

            var crmSvs = CrmServiceClient;
            service = crmSvs.OrganizationServiceProxy;


            dx_context m_serviceContext = new dx_context(service);
            var setting = (from sett in m_serviceContext.dx_autonumberSet
                select sett).FirstOrDefault();

            int inital = 0+1;
            var str_complete_string = $"{setting.dx_prefix}{setting.dx_separator}{inital.ToString().PadLeft(int.Parse(setting.dx_length),char.Parse(setting.dx_stringtocomplete))}";
            var str_complete_string2 = $"{setting.dx_prefix}{setting.dx_separator}{inital.ToString().PadRight(int.Parse(setting.dx_length), char.Parse(setting.dx_stringtocomplete))}";
            console.WriteLine(str_complete_string, ConsoleColor.Yellow);
            console.WriteLine(str_complete_string2, ConsoleColor.Yellow);


            if (setting.dx_postfix.Value)
            {
                str_complete_string = $"{str_complete_string}{setting.dx_separatorpostfix}{setting.dx_stringpostfix}";
            }

            console.WriteLine(str_complete_string, ConsoleColor.Yellow);


            System.Console.ReadLine();



            //var str_completeString = $"{setting.dx_prefix}"



        }

        private static CrmServiceClient CrmServiceClient
        {
            get
            {
                CrmServiceClient crmSvc =
                    new CrmServiceClient(
                        "Url=https://dynamics2g.crm4.dynamics.com;AuthType=Office365;UserName=systemadmin@mvp007.onmicrosoft.com;Password=3!arcrm40;");
                return crmSvc;
            }
        }
    }
}
