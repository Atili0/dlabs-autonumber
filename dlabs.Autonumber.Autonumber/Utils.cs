using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;

namespace Dlabs_Autonumber
{
    public static class Utils
    {
        public static string ToJson(this object obj, bool useSimpleDictionaryFormat = true)
        {
            var jsonSerializer = new DataContractJsonSerializer(obj.GetType());
            using (var stream = new MemoryStream())
            {
                jsonSerializer.WriteObject(stream, obj);
                return Encoding.UTF8.GetString(stream.ToArray());
            }
        }

        public static OptionSetValue ToOptionSetValue(this int value)
        {
            return new OptionSetValue(value);
        }
    }

    public static class PipelineStage
    {
        public const int PreValidation = 10;
        public const int PreOperation = 20;
        public const int PostOperation = 40;
    }

    public class Parametros {

        public Guid g_PluginTypeId { get; set; }
        public Guid g_FilterId { get; set; }
        public Guid g_MessageId { get; set; }
        public ConfigAutonumber o_Config { get; set; }
        public dx_confignumber o_Entity { get; set; }
    }
}
