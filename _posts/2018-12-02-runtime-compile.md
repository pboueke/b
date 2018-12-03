---
layout: post
title: Compiling user input during runtime in C#
date: 2018-12-03
header: "&nbsp;&nbsp;&nbsp;&nbsp; It is not always wise to allow the user to have control of the code running in tour application, but when you are the user things may be different. I have been in many situations were that would be desirable, specially when things like formatting are involved, where it may be much simpler to give access to native funcionality than to creating a parser. "
tags: [csharp]
comments: true
---

## Compiling user input during runtime in C#

&nbsp;&nbsp;&nbsp;&nbsp; It is not always wise to allow the user to have control of the code running in your application, but when you are the user things may be different. I have been in many situations where that would be desirable, specially when things like formatting are involved, where it may be much simpler to give access to native funcionality than to creating a parser. 

&nbsp;&nbsp;&nbsp;&nbsp; For this reason, I am going to share below the source I have been using to do just that.

```
using Microsoft.CSharp;
using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Linq.Expressions;

namespace Internal.Tools.MongoToCSV
{
    public static class FunctionCompiler
    {
        const string template =                                                           "" +
            "using System;                                                                 " +
            "using Newtonsoft.Json;                                                        " +
            "using System.Collections.Generic;                                             " +
            "using System.Linq;                                                            " +
            "class DelegateContainer {{                                                    " +
            "    public Func<dynamic, {0}> Function {{ get; set; }}                        " +
            "                                                                              " +
            "    public DelegateContainer() {{                                             " +
            "        Function = delegate(dynamic x) {{ {1} }};                             " +
            "    }}                                                                        " +
            "}}                                                                            " ;

        public static Func<dynamic, T> CompileFunc<T>(string funcStr)
        {
            string source = string.Format(template, typeof(T).FullName, funcStr);
            Assembly a;
            using (CSharpCodeProvider provider = new CSharpCodeProvider()) {
                List<string> assemblies = new List<string>();
                foreach (Assembly x in AppDomain.CurrentDomain.GetAssemblies()) {
                    try {
                        assemblies.Add(x.Location);
                    }
                    catch (NotSupportedException) { Console.WriteLine("Error Compiling User Code: Framework NotSupportedException"); }
                }

                CompilerResults r = provider.CompileAssemblyFromSource(new CompilerParameters(assemblies.ToArray()) { GenerateExecutable = false, GenerateInMemory = true }, source);
                if (r.Errors.HasErrors)
                    throw new Exception("Errors compiling delegate: " + string.Join(Environment.NewLine, r.Errors.OfType<CompilerError>().Select(e => e.ErrorText).ToArray()));
                a = r.CompiledAssembly;
            }
            
            object o = a.CreateInstance("DelegateContainer");
            return (Func<dynamic, T>)(o.GetType().GetProperty("Function").GetValue(o));
        }         
    }
}
```

&nbsp;&nbsp;&nbsp;&nbsp; Note that you can change the function input and output to your linking. The source you are compiling is the one you see at the template string, if you need references to another namespace, just add it there. You can also see that the user code will be added to the Function property, in such a way that something line ```x.Name = X.First + " " + x.Last; return x.Name;``` would be a valid input.  Here is an example usage:

```
var func = CompileFunc<string>("return x.ToString();");
var x = DateTime.Now;
Console.WriteLine(func(x));
// outputs '03.12.2018 10:02:00'
```

Cheers!
