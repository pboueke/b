---
layout: post
title: Using pipelines for good
date: 2018-12-05
header: "&nbsp;&nbsp;&nbsp;&nbsp; Pipelines are essential in optimizing production steps everywhere, but I find a lack of them in many of the places you should expect one, specially in the programming world."
image: capture.PNG
tags: [csharp, dotnet]
comments: true
---

&nbsp;&nbsp;&nbsp;&nbsp; Pipelines are essential in optimizing production steps everywhere, but I find a lack of them in many of the places you should expect one, specially in the programming world. You will find them in distributed architectures, but hardly ever inside applications that could benefit from one. That's usually because they are harder to create in most programming paradigms than the alternative, creating a pipeline framework from the ground up is not something people are confortable with for good reasons.

&nbsp;&nbsp;&nbsp;&nbsp; Despite all that, it doesn't need to be hard. The [pipelines](https://docs.microsoft.com/en-us/previous-versions/msp-n-p/ff963548(v=pandp.10)) proposed by the .Net parallel programming guide are really simple and still very effective. From their guide, all you have to do is this: 

~~~csharp
int seed = ...
int BufferSize = ...
var buffer1 = new BlockingCollection<string>(BufferSize);
var buffer2 = new BlockingCollection<string>(BufferSize);
var buffer3 = new BlockingCollection<string>(BufferSize);

var f = new TaskFactory(TaskCreationOptions.LongRunning, 
                                                     TaskContinuationOptions.None);

var stage1 = f.StartNew(() => ReadStrings(buffer1, ...));
var stage2 = f.StartNew(() => CorrectCase(buffer1, buffer2));
var stage3 = f.StartNew(() => CreateSentences(buffer2, buffer3));
var stage4 = f.StartNew(() => WriteSentences(buffer3));

Task.WaitAll(stage1, stage2, stage3, stage4);
~~~

&nbsp;&nbsp;&nbsp;&nbsp; Create stages and buffers between them, start a thread for each stage and bam. You are done. From there you can start playing around with adding more threads per stage, handling exceptions, cancellations and so on, as I have done in [PIPA](https://github.com/pboueke/PIPA). With thousands of hours running in production, PIPA is a generic, pipelined, multithreaded framework/application for any type of batch processing that could benefit from a parallel execution of its components, just define the buffers and stages of the pipeline and you are ready. With it I have been able to execute large ETL workloads with speeds as fast as I could read data from the disk.

&nbsp;&nbsp;&nbsp;&nbsp; All that just to reiterate how useful pipelines can be even in monolithic instances of applications. Having your data flowing through distributed cloud queues and streams may be great, but that may be an overkill for all workflows, sometimes all you need are better paradigms.

Cheers!
