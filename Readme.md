# 前言：救救 EOS 上的 RAM （你的钞票）

随着EOS主网的上线，大家对于EOS的关注度也越来越多。不少人也尝试通过cleos命令或者一些工具来尝试生成了自己在EOS主网上的代币。生成代币一般来说都是通过部署一套 eosio.token 合约来实现。但是，大家万万没有想到的是随着EOS的RAM市场的兴起，之前学习/折腾空气币的代价如此的大。
按照现在EOS上RAM的价格 0.45EOS/KB 来计算，大约一个空气币需要占用内存190K的空间，它的成本（不包含发放）大约是 190 * 0.45 * 8.5 * 6.6 = 4796 元RMB！

心在滴血是吧。。。。。。  :)

可惜的是，EOS系统中并未提供完全的销毁你部署过的合约的功能。。。。。。不能销毁，但是我们可以重新部署啊。

所以前两天我在微信公众号柚子茶坊上发表了一篇名为[还有后悔药，拯救空气币中你的柚子！]("https://mp.weixin.qq.com/s/X9Ftr5YAoiizHYNAxnQs6w")的文章。但是很可惜，自行部署EOS上的合约具有一点点小门槛，但是许多人以前发币都是找别人或者一些工具来代为发币，他们完全无力自己来重新部署合约。甚至有人从微信上追到了我愿意付出10~20个EOS的代价希望我来帮他们把这部分合约占据的空间清除掉（嗯，看来我不用上班了。。。光靠替大家清理合约就能致富  :LOL ）。

但是，事实上的门槛在于重新部署一个合约要么我需要拿到你的私钥，这并不安全；或者你给我的公钥相应的权限，这对大量小白来说更不现实；或者我去研究Scatter来写一个网页版的工具，但是这玩意儿我还得要准备服务器啥的，成本又是个问题。

想来想去，还是直接帮大家写一个小工具算了。大家可以利用这个帮助你部署一些占用空间较小的但是没用的合约来释放掉你的内存（或者说用它来帮你部署其他你需要的合约）。 例如：

- EOS系统自带的 hello 合约示例： https://github.com/EOSIO/eos/tree/master/contracts/hello ，它部署完占用空间大约 30K 。
- itleaks 提供的 empty 合约：https://github.com/itleaks/eos-contract/tree/master/cleancontract-exp/empty 一个什么都没有用的合约，部署完占据空间在10K以下。

## 如何使用这套工具

### 安全风险提示

除了 EOS 自身的 [eosjs]("https://github.com/EOSIO/eosjs" "eosjs") 库用于处理和EOS的一些功能，以及 [nconf]("https://www.npmjs.com/package/nconf" "nconf") 库用于处理命令参数之外，尽可能的没有引入其他第三方开源组件来减少安全风险。同时本软件完全开源，您完全可以放心的使用或者参考我的示例自行来开发一个新版的。
但是，本软件/源代码并无法保证其完全的安全性。**所以，在使用本工具时，您认可自行承担使用本工具带来的一切后果和安全风险。**

### 环境准备

- 本工具运行在Node环境下，我的开发环境是Node v9.11.1。您可以从[Nodejs官方网站]("https://nodejs.org/en/") 下载。理论上以前v8.x的版本或者现在最新的v10.x的版本都行。
-  下载本工具的源代码或者压缩包：
    -  git方式： ``` git clone https://github.com/breakstring/savemyeosram.git ```
    -  直接下载压缩包并解压： [v1.0]("https://github.com/breakstring/savemyeosram/releases/tag/v1.0")
- 打开一个命令终端（例如：Windows下的cmd或者Powershell，macOS下的终端等等。。。。）在工具的根目录下执行 ```npm install```来安装它附带需要的一些库文件。

### 运行方式

在终端里执行(别忘了替换上你的账户名和私钥)：
```bash
node index.js --account "你的账户名" --privatekey "你的私钥"
```
如果一切正常，它会输出如下格式的数据：
```
RAM usage/total befor set contract:39547/600186
RAM usage after set contract:7918/600186
```
第一行就是之前你的内存占用和内存总量，第二行就是部署了新的合约之后的内存占用和内存总量。

### 已知问题

- 有时候主网的节点可能并不稳定，您可以自行修改index.js中第11行 httpEndpoint 为一个稳定的节点。例如：
    - http://mainnet.eoscanada.com
    - http://mainnet.eoscalgary.io
    - http://mainnet.eoscannon.io
    - http://mainnet.genereos.io
- 默认代码中部署的是 hello 合约，它占用大约30K。如果您觉得还希望再释放点（毕竟是白花花的银子），可以在部署 hello 后修改 index.js 中的第38行，将 hello 修改为 empty 即可。（在某些时候直接部署 empty 会出错，通过部署系统的hello合约后再部署empty一般问题不大）
- 有时候总有一些莫名其妙的错误。。。所以检查一下是不是你把私钥或者账户名写错了。
- **释放了 eosio.token 合约你之前发的代币就没了，别人那里也查不到了。**

### 您的支持是我的动力

您的支持是我学习EOS的动力，如果我的这个工具成功的帮您节省出来70~80个EOS的话，在您愿意的情况下欢迎扫描下方我的EOS地址给我打赏，并同时转发此文章以便帮到更多的人。

![g4ydkmjxguge](EOS.jpeg)