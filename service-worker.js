/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["404.html","169df2e5e744c1ef3ebc043e90c9068a"],["about.html","f115492f6d31c1f8d47fc07feca2c2e2"],["index.html","90bcf91e18ac15b928f2ae874736f695"],["projects.html","9065e8914c1bac2279cb8e004525a678"],["public/css/sweetalert.css","9b8007e29ad2778d449264166a7892b7"],["public/css/syntax.css","a6277492daf6bf271a6053d17bf68c5e"],["public/img/apple-touch-icon-144-precomposed.png","545d50db71e48bd2898e73d81372c5ca"],["public/img/codepen.svg","30370072457c5e8af750a5f02b3eec0c"],["public/img/comparison.jpg","bf50468eb2d371c699b220b73b2928b4"],["public/img/eci.gif","0fce384e66252e60f2f8da995271fe2a"],["public/img/facebook.svg","e65be67322135ced16905e9b117cd66e"],["public/img/favicon.ico","765b67c2a6f31e38e25969c657a14afa"],["public/img/gd.png","7f2f9e027be6a0bfc9be4e47991a8f48"],["public/img/github.svg","6f7591616b8f7bbb6bc74a304935d119"],["public/img/ink.gif","d7f8f645aefb508d0689991e2b5149f7"],["public/img/linkedin.svg","631ad0fe6f5a0a512f9db2cd2422401e"],["public/img/logo-jekyll.png","abe13a52ed35994e9ca9d1ef4ac93ce0"],["public/img/mesa.jpg","80a887ac8cc230d240af3f0c20ba775b"],["public/img/pb_256.png","4409ec81d5fc3ee254fb1efa0a9a40de"],["public/img/pb_512.png","e7c0d55a5dbe78275e5c0b183c74a367"],["public/img/pb_lowpoly.png","aabe0f1b52d938a1fd32b4081554e375"],["public/img/pongo.gif","08832c19d2b294a128f4ad00dad1473c"],["public/img/rtm_ani.gif","2d33decaf8fd9711ea03277f5970d158"],["public/img/unihexgrid_astar.gif","eabf3d9eae8328836b6cb6700282a862"],["public/img/wvc.gif","5b4c93497ebc004b3179b2d6ca2c37f7"],["public/javascript/jquery.js","ee092541bc79668e3e0a7b76d2faf00c"],["public/javascript/ocanvas-2.8.1.min.js","206d0069b8fe3a576a879cc0f4de8c43"],["public/javascript/sweetalert.min.js","0068f44b0aa1b83fa7679860ceb26590"],["public/manifest.json","117947dd85e93e41dabc1eef5fd75554"],["public/projects/hex/demos/AS/LICENSE.txt","ec945b2ad43768b4b9cd05b0c9f12a26"],["public/projects/hex/demos/AS/gridAS.css","e9939e8f1534a0d880db094b6cc8af15"],["public/projects/hex/demos/AS/gridAS.html","8c6a70f5e3755de0af8d70a94f751b2c"],["public/projects/hex/demos/AS/hexUIAS.js","68003f1ba70785db53d59e7ca8409eff"],["public/projects/hex/demos/AS/unihexgridAS.js","56c1d04fc876a2ab0428ef03d48abac5"],["public/projects/hex/grid.css","e9939e8f1534a0d880db094b6cc8af15"],["public/projects/hex/grid.html","50b6d8dee7e91988512ef897af46cf91"],["public/projects/hex/hexUI.js","533be6d3439d07f0359e1f28273dd448"],["public/projects/hex/ocanvas-2.8.1.min.js","206d0069b8fe3a576a879cc0f4de8c43"],["public/projects/hex/priorityqueuejs/Readme.md","9a0c15b529a3fd61582bd21fbb638ce1"],["public/projects/hex/priorityqueuejs/pq.js","d5124d06aeb6badb4a431d1c1bbe5311"],["public/projects/hex/readme.md","8c46baf7611bd1e37c58349f612e1440"],["public/projects/hex/sorted-array/LICENSE","f502a5e734942fd4766a09eeae64d7bf"],["public/projects/hex/sorted-array/sorted-array.js","681a4d301cfefaef88244255cddffa8d"],["public/projects/hex/unihexgrid.js","c650dd00163ae08f5c75d4d027744b49"],["public/projects/others/t2pa.html","a9bdd2a1e7ccd35ecf6df28a4bec08de"],["public/projects/risks/risks.html","11f228845fc47fa672f90abf5302d84e"],["public/projects/risks/risks_lite.js","4b44534a1f07d4fd35012d44b10b46ef"],["public/projects/webgl/cg01/cg01.css","6e293bf0c1cc954eec9858e1704c4caf"],["public/projects/webgl/cg01/cg01.html","5ebc41a33cf1b534c956cb6d0ff3643c"],["public/projects/webgl/cg01/lines.js","3d84a494deb475db8372ca43e61eae41"],["public/projects/webgl/cg02/cg02.css","6dce772f39d3fef21ae2de04cb62588e"],["public/projects/webgl/cg02/cg02.html","f391f3303f726e6da9b4a5f9edcf5c3c"],["public/projects/webgl/cg02/cubes.js","c792ff2d091aaf5cb02f54449fa19d5d"],["public/projects/webgl/gremio/gremio.html","02adc774c7bdb494e48230b025b243a1"],["public/projects/webgl/gremio/test.css","7da185c882195fde90343895d5d4415d"],["public/projects/webgl/gremio/test.js","9f426102e2759f26d19364ea2f2d8905"],["public/projects/webgl/readme.md","b28c950c4416cfa8cb6e1fd4f668d062"],["public/projects/webgl/three.js-r71/CONTRIBUTING.md","c7089f0f1406352b045ac37484455c1d"],["public/projects/webgl/three.js-r71/LICENSE","453cb61c76200fac9c72c37960c36702"],["public/projects/webgl/three.js-r71/README.md","ad71059db2f93b83452ae3691246e534"],["public/projects/webgl/three.js-r71/bower.json","0ef01b024f303e9afdf2abdb0343a0e5"],["public/projects/webgl/three.js-r71/build/three.js","ced5159df48afa72ab4e6a4b0d7b00aa"],["public/projects/webgl/three.js-r71/build/three.min.js","6a29021cc05d40fb5a8aba61a4ddc693"],["public/projects/webgl/three.js-r71/src/Physijs/physi.js","37035603b46fbfd2b1a72fb3b3a7af43"],["public/projects/webgl/three.js-r71/src/Physijs/physijs_worker.js","4fd283741e6b57e94ff9b1e64384561e"],["public/projects/webgl/three.js-r71/src/Three.js","872c411b7c2630e9b75b1ef22c4812ac"],["public/projects/webgl/three.js-r71/src/cameras/Camera.js","a97158b9ff64009edfa31e860c4220de"],["public/projects/webgl/three.js-r71/src/cameras/CubeCamera.js","9486be9a552b8f6cb7942d09b59d9224"],["public/projects/webgl/three.js-r71/src/cameras/OrthographicCamera.js","8ee64bc664ec5e490ce6b011e0d24c8d"],["public/projects/webgl/three.js-r71/src/cameras/PerspectiveCamera.js","e3ff7c1710670f81e0af2e9ca3e08f11"],["public/projects/webgl/three.js-r71/src/controls/EventsControl.js","b9f531cb8756bdedb2c975660ec0abc5"],["public/projects/webgl/three.js-r71/src/controls/OrbitControls.js","937601f2ff7283c8ae2e0a2c1bf834b7"],["public/projects/webgl/three.js-r71/src/controls/TrackballControls.js","5eb3e311d0eab7d76b7f18ad6f039880"],["public/projects/webgl/three.js-r71/src/core/BufferAttribute.js","6b4ff2ab5acdf57c2d890da425f155a7"],["public/projects/webgl/three.js-r71/src/core/BufferGeometry.js","aefaecc9c28254f7cd199ab0aac08e7f"],["public/projects/webgl/three.js-r71/src/core/Clock.js","b77e551fdd43953867a23c26d5bbc311"],["public/projects/webgl/three.js-r71/src/core/DynamicBufferAttribute.js","410ab92c13575ac5976cd7ea05d02004"],["public/projects/webgl/three.js-r71/src/core/EventDispatcher.js","2bc2ceb7a278f26e4282916d4c4d3f74"],["public/projects/webgl/three.js-r71/src/core/Face3.js","2e1b4cd3359d97522671b57e2f541eda"],["public/projects/webgl/three.js-r71/src/core/Face4.js","84d241abf438a7745863ca9db41cf031"],["public/projects/webgl/three.js-r71/src/core/Geometry.js","23bbfc0443c54811aa53f803e397fee2"],["public/projects/webgl/three.js-r71/src/core/Object3D.js","9e1a627e1a33b5cfd6413b883a6a99cf"],["public/projects/webgl/three.js-r71/src/core/Raycaster.js","35c483bc3ef84ae52e2a44237131c6da"],["public/projects/webgl/three.js-r71/src/extras/FontUtils.js","ac9754b81517f81a8fb199d3694fbe75"],["public/projects/webgl/three.js-r71/src/extras/GeometryUtils.js","d1e6130612614defb63e9bddbc71acb1"],["public/projects/webgl/three.js-r71/src/extras/ImageUtils.js","773ceed277d835fd4949b411ecf051d3"],["public/projects/webgl/three.js-r71/src/extras/SceneUtils.js","7dc6340d4c3a6534d9c2d1f83af0f160"],["public/projects/webgl/three.js-r71/src/extras/animation/Animation.js","2400345cb2c091e72b53da451b6a5dbc"],["public/projects/webgl/three.js-r71/src/extras/animation/AnimationHandler.js","c9da0174348c25d20a95474ac24679d9"],["public/projects/webgl/three.js-r71/src/extras/animation/KeyFrameAnimation.js","4866a0c45526b30fb006194dd29c87b4"],["public/projects/webgl/three.js-r71/src/extras/animation/MorphAnimation.js","2c91958f9a44ed8c3fd5058f70d23213"],["public/projects/webgl/three.js-r71/src/extras/audio/Audio.js","feef125500f20a383543dd5c7b536837"],["public/projects/webgl/three.js-r71/src/extras/audio/AudioListener.js","69181298a717df64079f84f1e81f3ff8"],["public/projects/webgl/three.js-r71/src/extras/core/Curve.js","d8620c2bba8831c4dceba66ee2fc6a93"],["public/projects/webgl/three.js-r71/src/extras/core/CurvePath.js","6f1a989ef77d2415a00ebebbe637e19f"],["public/projects/webgl/three.js-r71/src/extras/core/Gyroscope.js","49a80faf7459001aace61299499fe330"],["public/projects/webgl/three.js-r71/src/extras/core/Path.js","06f51d15937f2bcd977005e58b51f927"],["public/projects/webgl/three.js-r71/src/extras/core/Shape.js","79f8b8de17fe4e032fa0f2faa683fde2"],["public/projects/webgl/three.js-r71/src/extras/curves/ArcCurve.js","09f644f96385391e2f8d7fa5e416cb52"],["public/projects/webgl/three.js-r71/src/extras/curves/ClosedSplineCurve3.js","82e731500882121ee0dbcd7675caa6b6"],["public/projects/webgl/three.js-r71/src/extras/curves/CubicBezierCurve.js","11c3cec980437e82670c5a749f04d401"],["public/projects/webgl/three.js-r71/src/extras/curves/CubicBezierCurve3.js","04a7a4472a9279ef16b480de85564b88"],["public/projects/webgl/three.js-r71/src/extras/curves/EllipseCurve.js","a159b89f9b8a92d784790f02b5c1d31f"],["public/projects/webgl/three.js-r71/src/extras/curves/LineCurve.js","add91a6d23e844b98a20d48d42a1ad06"],["public/projects/webgl/three.js-r71/src/extras/curves/LineCurve3.js","e7a5c51e0b322e33e25e21c03aa4fb1f"],["public/projects/webgl/three.js-r71/src/extras/curves/QuadraticBezierCurve.js","149aa554fc486d2d38182b168288b0c0"],["public/projects/webgl/three.js-r71/src/extras/curves/QuadraticBezierCurve3.js","5c34e6752758108b291836bda9f72be3"],["public/projects/webgl/three.js-r71/src/extras/curves/SplineCurve.js","1859434a683b38aa7ec6075df13ea4a9"],["public/projects/webgl/three.js-r71/src/extras/curves/SplineCurve3.js","e5a591027145a7f825f02d298db4354f"],["public/projects/webgl/three.js-r71/src/extras/geometries/BoxGeometry.js","fa2952562c02405655e3b54748591867"],["public/projects/webgl/three.js-r71/src/extras/geometries/CircleGeometry.js","82d448e8e6adda259e027a563388b148"],["public/projects/webgl/three.js-r71/src/extras/geometries/CubeGeometry.js","aa52a6c8ad4b58a81cc121f5fa1559f6"],["public/projects/webgl/three.js-r71/src/extras/geometries/CylinderGeometry.js","f12e2335f39c50eef3b5336498cfddf7"],["public/projects/webgl/three.js-r71/src/extras/geometries/DodecahedronGeometry.js","2b5a7aa972e6b56d4344301cc3eda272"],["public/projects/webgl/three.js-r71/src/extras/geometries/ExtrudeGeometry.js","7f9dcd31581c5e767e58614a87fd0a2b"],["public/projects/webgl/three.js-r71/src/extras/geometries/IcosahedronGeometry.js","35ee06a8e4850c00a09b92fa5046bbc6"],["public/projects/webgl/three.js-r71/src/extras/geometries/LatheGeometry.js","7baefe7bb234bb22c81b979ce6babc81"],["public/projects/webgl/three.js-r71/src/extras/geometries/OctahedronGeometry.js","655f0c738495913718bbc5598d156f43"],["public/projects/webgl/three.js-r71/src/extras/geometries/ParametricGeometry.js","12a7a019fdb8183f91ed55d0f44e150e"],["public/projects/webgl/three.js-r71/src/extras/geometries/PlaneBufferGeometry.js","01ae13287d777cc656d44423311978fa"],["public/projects/webgl/three.js-r71/src/extras/geometries/PlaneGeometry.js","00db2d0c1dfe9f5bceadbebdc8a5e476"],["public/projects/webgl/three.js-r71/src/extras/geometries/PolyhedronGeometry.js","7c6d162d730c4c8b6f49c64c45636383"],["public/projects/webgl/three.js-r71/src/extras/geometries/RingGeometry.js","3cf078eb4a7642717f154937182b5991"],["public/projects/webgl/three.js-r71/src/extras/geometries/ShapeGeometry.js","58664df5590be5e7b9972f3fdff2a599"],["public/projects/webgl/three.js-r71/src/extras/geometries/SphereGeometry.js","86a13401c49b88eb4593c7424f6ba841"],["public/projects/webgl/three.js-r71/src/extras/geometries/TetrahedronGeometry.js","e7be75de379d7dbf35bb095ac5207d66"],["public/projects/webgl/three.js-r71/src/extras/geometries/TextGeometry.js","5493f85dd5cc9225c8eaf52a4d01f7ca"],["public/projects/webgl/three.js-r71/src/extras/geometries/TorusGeometry.js","d3253e16ccac75a6a6fba9c378f197ec"],["public/projects/webgl/three.js-r71/src/extras/geometries/TorusKnotGeometry.js","e70081c3ad0cdad69758ad66491b5073"],["public/projects/webgl/three.js-r71/src/extras/geometries/TubeGeometry.js","5ad29980d1e64cf29378327526eb9be0"],["public/projects/webgl/three.js-r71/src/extras/helpers/ArrowHelper.js","bec67ac7dd0ceac985725d1dfc7f3d83"],["public/projects/webgl/three.js-r71/src/extras/helpers/AxisHelper.js","7b402c4214d9d40d0c1ba38b8f1ecbc3"],["public/projects/webgl/three.js-r71/src/extras/helpers/BoundingBoxHelper.js","ac7ebf6b666b36ac1874f01a2924ee07"],["public/projects/webgl/three.js-r71/src/extras/helpers/BoxHelper.js","2af8e8dbaa79ec9875000073b354e87d"],["public/projects/webgl/three.js-r71/src/extras/helpers/CameraHelper.js","73648ea3417e35e759eff9e0fc28da91"],["public/projects/webgl/three.js-r71/src/extras/helpers/DirectionalLightHelper.js","08b29fedff7b56b481b816f041bb96a9"],["public/projects/webgl/three.js-r71/src/extras/helpers/EdgesHelper.js","03f936c88a454a097acfe6a822d546ac"],["public/projects/webgl/three.js-r71/src/extras/helpers/FaceNormalsHelper.js","22bacac1fdf1d071f5d35d2625bf58d9"],["public/projects/webgl/three.js-r71/src/extras/helpers/GridHelper.js","5fb31aa8863ef9fc87d1eafc97697195"],["public/projects/webgl/three.js-r71/src/extras/helpers/HemisphereLightHelper.js","7945e08a6baf7ce312a338182952d437"],["public/projects/webgl/three.js-r71/src/extras/helpers/PointLightHelper.js","5a68904e580e826ca18b15aa36314ad2"],["public/projects/webgl/three.js-r71/src/extras/helpers/SkeletonHelper.js","b5642b1557aa685a02e28a2e8fdef1c5"],["public/projects/webgl/three.js-r71/src/extras/helpers/SpotLightHelper.js","07d8f33cb26999abe68fabfe0efaa0a0"],["public/projects/webgl/three.js-r71/src/extras/helpers/VertexNormalsHelper.js","c1553a8e7e00133fc3662fa5d75c45cd"],["public/projects/webgl/three.js-r71/src/extras/helpers/VertexTangentsHelper.js","c34c6430e72a4f059c50bbc1fe2b5323"],["public/projects/webgl/three.js-r71/src/extras/helpers/WireframeHelper.js","38860f2f764129bfec90d022cde63c80"],["public/projects/webgl/three.js-r71/src/extras/objects/ImmediateRenderObject.js","7f735325cc8705c21497c71d2bcfa94a"],["public/projects/webgl/three.js-r71/src/extras/objects/MorphBlendMesh.js","d641e70e1069a1df3a7cfef32d51c7a1"],["public/projects/webgl/three.js-r71/src/lights/AmbientLight.js","a00ec74a57e553f441f5f174c24980dd"],["public/projects/webgl/three.js-r71/src/lights/AreaLight.js","2e0e943c3ff26f28cf2bfa461215f12f"],["public/projects/webgl/three.js-r71/src/lights/DirectionalLight.js","f23a866a547c4cafe4d65b601145fdaa"],["public/projects/webgl/three.js-r71/src/lights/HemisphereLight.js","008486b4ed0665afe6d3ae9a6ed83584"],["public/projects/webgl/three.js-r71/src/lights/Light.js","c0faedfd32bfabe97417d49f2da667d6"],["public/projects/webgl/three.js-r71/src/lights/PointLight.js","0a8f39d016457e054b6d6fec75bd9fad"],["public/projects/webgl/three.js-r71/src/lights/SpotLight.js","f6516cb3dd7dad3a8c501a152ff141a8"],["public/projects/webgl/three.js-r71/src/loaders/BinaryTextureLoader.js","c3681782a6ebd8a2f7d1d540e0575dcd"],["public/projects/webgl/three.js-r71/src/loaders/BufferGeometryLoader.js","f46cae61154e83d1761e625b5b8efb1f"],["public/projects/webgl/three.js-r71/src/loaders/Cache.js","b36eef1fa3e3508a26c4cc3846d6c22c"],["public/projects/webgl/three.js-r71/src/loaders/CompressedTextureLoader.js","74570f8da1d6e4dfb021e94a23a72503"],["public/projects/webgl/three.js-r71/src/loaders/GeometryLoader.js","531dd048a0f515a37f54243a60f5a7e5"],["public/projects/webgl/three.js-r71/src/loaders/ImageLoader.js","512ba474e802f9f2e7d6becb594e7d48"],["public/projects/webgl/three.js-r71/src/loaders/JSONLoader.js","1c49ebc0b023ae366d2ceb844e70f162"],["public/projects/webgl/three.js-r71/src/loaders/Loader.js","8ac3d5e14b82d20abe84987f4d059839"],["public/projects/webgl/three.js-r71/src/loaders/LoadingManager.js","d076775fb9debc12475f2f8798e3b649"],["public/projects/webgl/three.js-r71/src/loaders/MaterialLoader.js","4633087e624918881b44680dc565c419"],["public/projects/webgl/three.js-r71/src/loaders/ObjectLoader.js","ccecfef123d8f44767a94d81c1aea349"],["public/projects/webgl/three.js-r71/src/loaders/TextureLoader.js","6754f27fc3b1836e5f3b37900af5bdd2"],["public/projects/webgl/three.js-r71/src/loaders/XHRLoader.js","f1196394c14f448a2dbac798b0828cb6"],["public/projects/webgl/three.js-r71/src/materials/LineBasicMaterial.js","df0abef87101a1ab332fad6359f5ac57"],["public/projects/webgl/three.js-r71/src/materials/LineDashedMaterial.js","e1592cce983e9f30cfa1f3ab998e86fd"],["public/projects/webgl/three.js-r71/src/materials/Material.js","a32ea13d469da39f096806bc3907c819"],["public/projects/webgl/three.js-r71/src/materials/MeshBasicMaterial.js","7e2bf841b61da03b54886572c770aa00"],["public/projects/webgl/three.js-r71/src/materials/MeshDepthMaterial.js","4a3ad86dffc33ee50d9da6a25cb9989b"],["public/projects/webgl/three.js-r71/src/materials/MeshFaceMaterial.js","c13e947762fa3fe41c2bcbc5ac9e2943"],["public/projects/webgl/three.js-r71/src/materials/MeshLambertMaterial.js","85d8b4b1b3ed3aef63d186d0d3d28195"],["public/projects/webgl/three.js-r71/src/materials/MeshNormalMaterial.js","af5b37442cc068fac32e712cdf4ab02e"],["public/projects/webgl/three.js-r71/src/materials/MeshPhongMaterial.js","d23a1084b495271daeb29f9b9d9b6bdb"],["public/projects/webgl/three.js-r71/src/materials/PointCloudMaterial.js","c224a28bad1556ecc3f1b9de237135a8"],["public/projects/webgl/three.js-r71/src/materials/RawShaderMaterial.js","f5ced0bb78bf1ba53c9cbd4fb52de6f8"],["public/projects/webgl/three.js-r71/src/materials/ShaderMaterial.js","3e7d50712651dde6e6de5d6ccb880c54"],["public/projects/webgl/three.js-r71/src/materials/SpriteMaterial.js","479b6146d0cf81660bee2da2453ee185"],["public/projects/webgl/three.js-r71/src/math/Box2.js","fb72f3220c0fda12885457c3a5401f1f"],["public/projects/webgl/three.js-r71/src/math/Box3.js","94046594b37983208035e68f6d08185f"],["public/projects/webgl/three.js-r71/src/math/Color.js","ae2618efa7307a22f7bf13e61b6b8fd3"],["public/projects/webgl/three.js-r71/src/math/Euler.js","fc349e9f41debb83d74acf50ba40c65f"],["public/projects/webgl/three.js-r71/src/math/Frustum.js","380acd097ec2d0e32a9f6018ed1d0d1f"],["public/projects/webgl/three.js-r71/src/math/Line3.js","5f3129a56cd0d925a35dd2b504b57998"],["public/projects/webgl/three.js-r71/src/math/Math.js","d54ac82c907d38f96f78da6fe635f422"],["public/projects/webgl/three.js-r71/src/math/Matrix3.js","230f0058d59fa1eefb23841de4cbe3f6"],["public/projects/webgl/three.js-r71/src/math/Matrix4.js","72c75d4f2450e50f059f318803aa5bec"],["public/projects/webgl/three.js-r71/src/math/Plane.js","73fd84ca970cc6973ad140f4b16e3ce1"],["public/projects/webgl/three.js-r71/src/math/Quaternion.js","66abff3b1185fd6f3ad6a4f099830d04"],["public/projects/webgl/three.js-r71/src/math/Ray.js","a093fa5b3076d4b4e27e65fe471975a9"],["public/projects/webgl/three.js-r71/src/math/Sphere.js","6c916f7ca78699b9957f2a5644b88518"],["public/projects/webgl/three.js-r71/src/math/Spline.js","108f0a9395da9eb281ebf8e6656c19c1"],["public/projects/webgl/three.js-r71/src/math/Triangle.js","f8cb40f31bc656026ee7460cb9d161e5"],["public/projects/webgl/three.js-r71/src/math/Vector2.js","f77b80319ce1e5caf924e9795ee087c0"],["public/projects/webgl/three.js-r71/src/math/Vector3.js","b991740d76ea5ba44b19a226a13cb11c"],["public/projects/webgl/three.js-r71/src/math/Vector4.js","6e0ee6e74cb62d60ffcee239c4bb7c19"],["public/projects/webgl/three.js-r71/src/objects/Bone.js","244c4d0642d13f2c9998d67b3c421e3a"],["public/projects/webgl/three.js-r71/src/objects/Group.js","be9d924e71655da30f4aa578a1683d28"],["public/projects/webgl/three.js-r71/src/objects/LOD.js","58a081389dacb78cb888ffca65c44dc0"],["public/projects/webgl/three.js-r71/src/objects/LensFlare.js","4c37f06c020eb33ebabc3c4c8f4b32eb"],["public/projects/webgl/three.js-r71/src/objects/Line.js","5e04ffc71211c279d9bdb5f8422ad99b"],["public/projects/webgl/three.js-r71/src/objects/Mesh.js","a8e21e857a0684a6ec08b988250e64c8"],["public/projects/webgl/three.js-r71/src/objects/MorphAnimMesh.js","474d53c2ece1876cc52d0d395e045597"],["public/projects/webgl/three.js-r71/src/objects/PointCloud.js","72f43d42898974086fd7cfb8784a1ffd"],["public/projects/webgl/three.js-r71/src/objects/Skeleton.js","db9dfff6f3dff0432683f683f953296a"],["public/projects/webgl/three.js-r71/src/objects/SkinnedMesh.js","2d4e041c5bb0059647932d9e6dcbd1ba"],["public/projects/webgl/three.js-r71/src/objects/Sprite.js","77eadb2bac21cf8aa4ca519ba096ae42"],["public/projects/webgl/three.js-r71/src/renderers/WebGLRenderTarget.js","480bdb5e1ce2b2fc8bb2d3b7ebefaff6"],["public/projects/webgl/three.js-r71/src/renderers/WebGLRenderTargetCube.js","fe2c6c651428ca44e658aa44f20741d9"],["public/projects/webgl/three.js-r71/src/renderers/WebGLRenderer.js","e825521d15348e21b1d4105169305978"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk.js","3e75e14f8ad8f398d5352880055e0e94"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/alphamap_fragment.glsl","a3de3ed6bc36b1085e43d8c2e0d935e3"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/alphamap_pars_fragment.glsl","ea053b5b522ae36a90f5aabf8989e9a3"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/alphatest_fragment.glsl","83fbf34216651122e7fd639441add823"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/bumpmap_pars_fragment.glsl","f175b99b863acd3d67a23ffe298b7a8c"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/color_fragment.glsl","afd2a7d7152cb3e70f15ca9ba000e8a6"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/color_pars_fragment.glsl","4e3af5379dc7cd41ac49554252544f30"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/color_pars_vertex.glsl","87fc4bee56e1ae64fc0e44900a3ce7c1"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/color_vertex.glsl","16ea1e2c3b6f65be438f1d31aa3469ac"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/common.glsl","568d184040e5d21eb4e5cca119cfad45"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/default_vertex.glsl","50f65d2c5a711012f438267c57f19224"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/defaultnormal_vertex.glsl","00de40425dc8139b38ad764555134f59"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/envmap_fragment.glsl","94aa3cc9e9b8496956d2242cd417065f"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/envmap_pars_fragment.glsl","a1cec4643260f0011999635c152114fc"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/envmap_pars_vertex.glsl","7fc7f3053ec1ea4bc6b07a06530b03ab"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/envmap_vertex.glsl","1e2c372a39392754a69c04f2bfa9c0ed"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/fog_fragment.glsl","55d0876361aabb7b6c75cd6641fb1cd8"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/fog_pars_fragment.glsl","cfe12d7b04f318456448100f873761ba"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/lightmap_fragment.glsl","e4b42a4bd05908125ba7dddd77fe4629"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/lightmap_pars_fragment.glsl","cbad037fcdfa948770c069d6d96859a3"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/lightmap_pars_vertex.glsl","f84719a08ca75953945704b7d7265ac0"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/lightmap_vertex.glsl","fe2eced8f196df92c63f9d697f5f4f28"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/lights_lambert_pars_vertex.glsl","cc2ac4d9526c09e50486c20ef8def4e2"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/lights_lambert_vertex.glsl","88c91e1cc9d326e5e415961139319ae8"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/lights_phong_fragment.glsl","93939188161a7e43eaeab666ff97864c"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/lights_phong_pars_fragment.glsl","37027543d4fff3ff71aec65263df465d"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/lights_phong_pars_vertex.glsl","decbd9247eabf8fafa3f0e0fe688b18a"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/lights_phong_vertex.glsl","ae52233d4ef85581a5778a8ed87299cd"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/linear_to_gamma_fragment.glsl","916b80b1738b82c09a6b592f64cfed5c"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/logdepthbuf_fragment.glsl","da8d7277e51368d6930d2282cbb5523f"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/logdepthbuf_pars_fragment.glsl","10f01018aaef6917d39fa3a16d9ab237"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/logdepthbuf_pars_vertex.glsl","f8a942aa9885c2c42ac0d2d780c78b3c"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/logdepthbuf_vertex.glsl","63afb29937e3ad32b585cb2827d7bc69"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/map_fragment.glsl","d909631d86ae46a35cd330371d071c34"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/map_pars_fragment.glsl","262b2377c7eef3dce560a9c045f2b2d5"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/map_pars_vertex.glsl","bf5e3b7062ecb6ecdeaee2208e0c2ef6"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/map_particle_fragment.glsl","c6569c85aa841b7e2d7d4392d003cca0"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/map_particle_pars_fragment.glsl","1e5965d65c708fb990eecadb72e3c811"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/map_vertex.glsl","d76d40c6fde2996be060686881d9ab9b"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/morphnormal_vertex.glsl","b9f4975abff75eaf42140f5ec4af7e8b"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/morphtarget_pars_vertex.glsl","468ce91f4236773df770f3f6054877c9"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/morphtarget_vertex.glsl","ca45901cfc2b8716e75e622b63180b6a"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/normalmap_pars_fragment.glsl","f52266e05036075af70897d2ccd3508f"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/shadowmap_fragment.glsl","8ec8c29a3af6888ada6eed7cdefd0161"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/shadowmap_pars_fragment.glsl","c478dfe1baf98ca0e6c6b13d906d3691"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/shadowmap_pars_vertex.glsl","057f27883afd4651296837570e56b62d"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/shadowmap_vertex.glsl","fae430f10e1e1ae824cb6952787a0721"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/skinbase_vertex.glsl","e39fa0a22ac6f70b604bf1b2e2823f31"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/skinning_pars_vertex.glsl","53b26b8df738cfb482e6034ef3bdcde1"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/skinning_vertex.glsl","e41edb14ab60395cc345cf7c8ccca552"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/skinnormal_vertex.glsl","02c1f9c2df12f553f71ee691ff7b307a"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/specularmap_fragment.glsl","9a4f20057cd3a674784bdb0d3f3102cb"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/specularmap_pars_fragment.glsl","a8f8d405f7f326df51fe67d58fd55497"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderChunk/worldpos_vertex.glsl","1052d5a8507426c956edd7b48859efda"],["public/projects/webgl/three.js-r71/src/renderers/shaders/ShaderLib.js","55c132ecf7bbb3c52fce15a50b2d64ad"],["public/projects/webgl/three.js-r71/src/renderers/shaders/UniformsLib.js","47c8ac29ce6952b4c050bf4036644a68"],["public/projects/webgl/three.js-r71/src/renderers/shaders/UniformsUtils.js","61ee2596c7169c39352c130dda873d3c"],["public/projects/webgl/three.js-r71/src/renderers/webgl/WebGLExtensions.js","a8bf797acc6ad1a86e706bdb760e0f78"],["public/projects/webgl/three.js-r71/src/renderers/webgl/WebGLProgram.js","05377c27a1c48e0c32d467e20ffffc1b"],["public/projects/webgl/three.js-r71/src/renderers/webgl/WebGLShader.js","54ba3ff2bbc2872e6aa4f551bfc72ac1"],["public/projects/webgl/three.js-r71/src/renderers/webgl/WebGLState.js","404f18566b6f84f1e90af9e28903b2a3"],["public/projects/webgl/three.js-r71/src/renderers/webgl/WebGLTextures.js","ff52ec637ee9c94fc42b2185ae9600e8"],["public/projects/webgl/three.js-r71/src/renderers/webgl/plugins/LensFlarePlugin.js","938f312c1bea25251cb596e38bd42d4d"],["public/projects/webgl/three.js-r71/src/renderers/webgl/plugins/ShadowMapPlugin.js","69a5295158c117e50be51dc0bc0956b6"],["public/projects/webgl/three.js-r71/src/renderers/webgl/plugins/SpritePlugin.js","a59573f18be383ec42f4b156588fa427"],["public/projects/webgl/three.js-r71/src/scenes/Fog.js","2f6b002da9fa1a326fea0aff11a76f0a"],["public/projects/webgl/three.js-r71/src/scenes/FogExp2.js","6ab66a5d5da8c9148ca8e57b10fc1beb"],["public/projects/webgl/three.js-r71/src/scenes/Scene.js","30c428a2c0585c50aa5cce1f174f2998"],["public/projects/webgl/three.js-r71/src/textures/CompressedTexture.js","0c95657e4a64b61d217fd79a6289dc48"],["public/projects/webgl/three.js-r71/src/textures/CubeTexture.js","11e6b0cc672e2b131a3c7c88c10bfc27"],["public/projects/webgl/three.js-r71/src/textures/DataTexture.js","043c1860f8c60c3a29b2334297fa7ab4"],["public/projects/webgl/three.js-r71/src/textures/Texture.js","a01402ed7a4eb577f890e208d893f850"],["public/projects/webgl/three.js-r71/src/textures/VideoTexture.js","a2f5b3f536615bc98a942698e78e8006"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







