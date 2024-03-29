<template >
    <div id="content" class="main-content">
        <div id="privacyWrapper" class="">
            <div class="privacy-container">
                <div class="privacyContent"> 
                    <div class="d-flex justify-content-between privacy-head">
                        <div class="privacyHeader">
                            <h1 v-if="getLanguage=='en'">HRG Introduction</h1> 
                            <h1 v-else>HRG 介绍</h1> 
                        </div> 
                    </div>

                    <div  v-if="getLanguage=='en'" class="privacy-content-container">
                        <section>
                            <h5>HRG (HPB Random Generator)</h5>
                            <p class="text2em">HRG (HPB Random Generator) is a provably fair and verifiable random number generator which uses smart contracts to access random values without compromising security and usability. For each request, HRG will feed back a random number, which can be verified before use to ensure that it has not been tampered with or manipulated by the Oracle system or any Submitter. </p>
                        </section>  
                        <section> 
                            <h5>Principle of Random Number Generation</h5> 
                            <p  class="text2em">There are three roles in the HRG system：</p>
                            <ul class="ml-2">
                                <li class="text-center">
                                   <p class="text-left">Submitter: The random number generator completes the generation of a random number seed in two stages;</p> 
                                </li> 
                                <li class="text-center">
                                   <p class="text-left">Consumer: A user who subscribes to and uses random numbers, also known as a subscriber or user;</p> 
                                </li> 
                                <li class="text-center">
                                   <p class="text-left">Oracle: HRG contract system, providing all operational interfaces for Submitters and consumers;</p> 
                                </li> 
                            </ul>
                            <p class="text2em">
                                The Submitter generates a random seed in two stages. When the Consumer subscribes to the random number, it is accompanied by a password. The Oracle system subscribes one of the Commits randomly submitted in the second stage to the Consumer, and records the subscription password. When the Submitter completes it, the Consumer can view the subscribed random number from Oracle through the subscribed seed hash. Because the submission is public to the world, while the subscription password bound to it is private, the random number is generated by hashing the seed and password. 
                            </p>
                            <p  class="text2em">The whole process is as follows: </p>
                             <p class="text-center">
                                  <img src="assets/docimg/flow-1.png" width="700" alt="">
                            </p>
                            <h5>Submitter Submits Random Seed(s)</h5> 
                            <p class="text2em">
                               The random number source of the HRG system is the random seed made by the Submitter. In order to ensure the unpredictability and verifiability of the seed, the Submitter completes the generation of a seed in two stages.
                            </p>
                            <ol class="ml-2"> 
                                <li class="text-center">
                                   <p class="text-left">The Submitter generates a 32-byte seed locally and obtains the hash of the seed through the contract method.</p>
                                    <img src="assets/docimg/1.png" width="670" alt="">
                                </li> 
                                <li class="text-center mt10">
                                    <p class="text-left">The Submitter performs the first stage of submission, submits the seed hash to Oracle, which is stored as Commits after Oracle checks duplicates, and obtains the true random number of the current block from HPB and stores it in Commits as a backup. Meanwhile, the Oracle system charges the Submitter 1 HRG as a deposit. </p>
                                       <img src="assets/docimg/2.png" width="670" alt="">
                                </li> 
                                <li class="text-center mt10">
                                    <p  class="text-left">After at least 1 block interval and no more than 200 blocks at most, the Submitter performs the second stage submission and submits the seed to the Oracle, and the Oracle recalculates the hash of the seed and compares it with that submitted in the first stage for verification. After passing, the seed submission is completed, the 1 HRG deposit is refunded, then 1 HRG is minted in the HRG Token contract and sent to the Submitter as a reward. </p>
                                     <img src="assets/docimg/3.png" width="670" alt="">
                                </li> 
                            </ol> 
                            <p class="text2em">
                                If the second-stage submission is not performed for more than 200 blocks after the first-stage submission, the Oracle will no longer accept the submission, and the deposit will be forfeited as a penalty. When the Submitter has accumulated a certain number of unverified records, the Submitter will no longer be able to perform new submissions, and can only switch to other accounts. 
                            </p>

                            <h5>Consumer/subscriber ordering and using nonce </h5> 
                            <p class="text2em">
                               Consumers subscribe to random numbers through the requestRandom interface of the Oracle system. If there is an available Commit, the subscription relationship will be automatically bound, and 2 HRG will be charged as a handling fee. 
                            </p>
                            <p class="text2em">
                                The Submitter should perform the second-stage submission on the subscribed Commit in time. After the second-stage submission is completed, the consumer can get the random number generated by the seed submitted by the Submitter; if the Submitter fails to complete the submission within the timeout period, the consumer will get a random number generated with the true random number on the HPB chain as the seed. 
                            </p>
                            <p class="text2em">
                                requestRandom allows two account addresses to be passed in, namely the deduction account and the consumption account. The deduction account provides a Gas fee. After it’s subscribed, you can view the subscription list. Both the deduction and the consumption accounts have the right to view the final random number. Consumer accounts usually use contract addresses that require the use of random numbers. 
                            </p>
                            <p class="text-center">
                                  <img src="assets/docimg/5.png" width="700" alt="">
                            </p> 
                        </section> 
                        <section> 
                            <h5>Instructions </h5>
                            <p class="text2em">1. How the Submitter submits the random number</p>
                            <p class="ml-3">
                                Submitters can submit manually on https://rc.hpb.io. 
                                Find the <a href="https://docs.google.com/document/d/1fRFQw0-9VqWAzQJi7d6SoZNjbTErZfloFE-5AaLX8HA/edit?usp=sharing" target="_blank">Operation Manual</a> for the procedure. 
                                Or operate the robot on the server for automatic submission, 
                                and see specific tutorials in the <a href="https://github.com/hpb-project/srng-robot" target="_blank">Robot Operation Manual</a>. 
                            </p>
                           <p class="ml-3">
                                Developers can also develop their own automatic submission programs. Here is a complete runnable example of submitting random numbers. Before executing, please make sure that there are enough HRG Tokens in the executing account. 
                            </p>
                               <pre>
            # git clone https://github.com/hpb-project/SRNG
            # cd SRNG
            # npm install
            # // manually modify PRIVATE_KEY in runcommiter.sh and fill in the private key of the execution account. 
            # ./runcommiter.sh
                            </pre>

                            <p class="text2em">
                                2. How consumers use random numbers
                            </p>
                            <p  class="ml-3">
                                Consumers can experience subscribing to random numbers directly and using contracts to subscribe to random numbers at https://rc.hpb.io/purchase. Besides, they can also develop their own contracts based on the example contracts to use random numbers. For specific operation steps, please refer to the <a href="https://docs.google.com/document/d/12JcuYK772bdwcCJ-dmn3t-rBTrUOk8L59rbhj96ihqQ" target="_blank">Operation Manual of HRG Subscribing Random Number</a> .
                            </p>
                            <p class="ml-3">
                                  Here is a complete example of a running consumer contract. Before executing, please make sure that there are enough HRG Tokens in the executing account. 
                            </p>
                            <pre>
            # git clone https://github.com/hpb-project/SRNG
            # cd SRNG
            # npm install
            # // manually modify PRIVATE_KEY in runconsume.sh and fill in the private key of the execution account. 
            # ./runconsume.sh
                            </pre> 
                        </section>
                            
                        <section>
                            <h5> HRG Economic Model</h5>
                           <p class="text2em">HRG issues HRG Token as the circulating currency of the system, with a total of 100,000,000 issued.</p> 
                        </section> 
                        
                         <section>
                            <h5> Token Allocation </h5>
                            <ul class="ml-2">
                                <li><p>50% output through mining</p> </li>
                                <li><p>20% for raising funds</p></li>
                                <li><p>15% for developer community events</p></li>
                                <li><p>5% for airdrop activities</p></li>
                                <li><p>And 10% is allocated to the project team. Of which,10% is initially released, and the rest will be released in 3 years</p></li>
                            </ul>
                        </section>

                           
                        <section>
                            <h5> Mining Reward Algorithm.</h5>
                            <p class="text2em">Users can get mining rewards for participating in the submission of random numbers.</p>
                             <ul class="ml-2">
                                <li><p>In the initial stage, after the user completes the seed verification, a reward of 1 HRG will be given;</p> </li>
                                <li><p>When the reward amount reaches 50% of the remaining total, the reward will start to be halved;</p></li> 
                            </ul>
                             <p class="text2em"> For example: the total amount of mining is 50,000,000 HRG, when the reward amount reaches 25,000,000, 0.5 HRG will be rewarded each time; when the total reward amount reaches 37,500,000, 0.25 HRG will be rewarded each time.</p>
                        </section>

                    

                        <section>
                            <h5> Limitations</h5>
                            <p class="text2em">  In order to maintain the healthy development of the system, the following restrictions are imposed on users' operations:</p>
                              <ul class="ml-2">
                                <li><p>Duplicate seeds and seed hashes must not be provided</p></li>
                                <li><p>There must be at least 1 block between the first-phase commit and the second-phase verification</p></li>
                                <li><p>The second-stage submission must be completed within 200 blocks after the first-stage submission, otherwise the second submission cannot be performed and the pledge deposit will not be returned</p></li>
                                <li><p>Submitters can only have a maximum of 100,000 unverified commits, after which they cannot submit new commits</p></li> 
                            </ul>
                        </section>
                    </div>

                    <div  v-else class="privacy-content-container">
                        <section>
                            <h5>HRG (HPB Random Generator)</h5>
                            <p class="text2em">HRG (HPB Random Generator) 是基于智能合约实现的一个可证明公平和可验证的随机数生成器，使智能合约能够访问随机值，而不损害安全性和可用性。对于每个请求，HRG 会反馈一个随机数，在消费合约使用它之前，可以进行随机数值的验证，确保不会被Oracle系统以及任何提交者篡改或操纵。</p>
                        </section>  
                        <section> 
                            <h5>随机数生成原理</h5> 
                            <p  class="text2em">HRG 系统中有三个角色：</p>
                            <ul class="ml-2">
                                <li class="text-center">
                                   <p class="text-left">提交者：随机数的生产者，分两个阶段完成一个随机数种子的生成；</p> 
                                </li> 
                                <li class="text-center">
                                   <p class="text-left">消费者：订阅并使用随机数的用户，也称订阅者或使用者；</p> 
                                </li> 
                                <li class="text-center">
                                   <p class="text-left">Oracle：HRG合约系统，为提交者和消费者提供所有操作接口;</p> 
                                </li> 
                            </ul>
                            <p class="text2em">
                                提交者分两阶段生成一个随机种子，当消费者订阅随机数时，附带一个口令，Oracle 系统从未完成第二阶段提交的Commit中随机订阅一条给消费者并记录订阅口令。当提交者完成第二阶段提交后，消费者可通过订阅的种子哈希从Oracle查看订阅到的随机数。因为种子的提交对世界是公开的，而与之绑定的订阅口令是私密的，所以随机数是由种子与口令哈希计算产生。
                            </p>
                            <p  class="text2em">整个过程如下图：</p>
                             <p class="text-center">
                                  <img src="assets/docimg/flow-1.png" width="700" alt="">
                            </p>
                            <h5>提交者提交随机种子</h5> 
                            <p class="text2em">
                                HRG系统的随机数来源是提交者制造的随机种子，为了保证种子的不可预知性和可验证性，提交者分两个阶段完成一个种子的生成。
                            </p>
                            <ol class="ml-2"> 
                                <li class="text-center">
                                   <p class="text-left">提交者本地生成一个32字节种子，通过合约方法获得种子的哈希.</p>
                                    <img src="assets/docimg/1.png" width="500" alt="">
                                </li> 
                                <li class="text-center mt10">
                                    <p class="text-left">提交者执行第一阶段提交，将种子哈希提交到Oracle，Oracle查重之后存储为commits，并且从HPB链上获取当前区块的真随机数存储到commits中作为备用。同时 Oracle 系统收取提交者 1 HRG 作为押金。</p>
                                       <img src="assets/docimg/2.png" width="500" alt="">
                                </li> 
                                <li class="text-center mt10">
                                    <p  class="text-left">至少间隔1个区块后，最多不超过200个区块，提交者执行第二阶段提交，将种子提交到Oracle，Oracle重新计算种子的哈希与第一阶段提交的哈希进行比较验证，验证通过后，种子提交完成，退还 1HRG质押金，并在HRG Token合约中铸造 1HRG作为奖励发送给提交者.</p>
                                     <img src="assets/docimg/3.png" width="500" alt="">
                                </li> 
                            </ol> 
                            <p class="text2em">
                                如果在第一阶段提交后超过200个区块没有执行第二阶段提交，那么Oracle将不再接受提交，罚没押金作为惩罚。当提交者累积的未验证记录达到一定数量后，提交者将无法再执行新的提交，只能切换其他账户。
                            </p>

                            <h5>消费者/订阅者订购和使用随机数</h5> 
                            <p class="text2em">
                                消费者通过Oracle系统的requestRandom接口订阅随机数，如果有可用Commit，则自动绑定订阅关系，同时收取 2 HRG作为手续费。
                            </p>
                            <p class="text2em">
                                提交者应当及时对被订阅的Commit执行第二阶段提交，完成第二阶段提交后，消费者可得到由提交者提交的种子产生的随机数；如果提交者超时未完成提交，那么消费者将得到以HPB链上真随机数作为种子产生的随机数。
                            </p>
                            <p class="text2em">
                                requestRandom允许传入两个账户地址，分别为扣费账户和消费账户。扣费账户提供手续费，订阅成功后可以查看订阅列表，扣费账户和消费账户都有权查看最终得到的随机数。消费账户通常使用需要使用随机数的合约地址。
                            </p>
                            <p class="text-center">
                                  <img src="assets/docimg/5.png" width="700" alt="">
                            </p> 
                        </section> 
                        <section> 
                            <h5>使用说明</h5>
                            <p class="text2em">1. 提交者如何提交随机数</p>
                            <p class="ml-3">
                                提交者可以在 https://rc.hpb.io 上进行手动提交，具体操作步骤见<a href="https://shimo.im/docs/pmkxQ1aXPMU8l9AN" target="_blank">操作手册</a>, 
                                也可以在服务器上运行robot 进行自动提交，具体教程见 <a href="https://github.com/hpb-project/srng-robot" target="_blank">robot操作手册</a>.
                            </p>
                             <p class="ml-3">
                                 开发者还可以开发自己的自动提交程序，这里有完整的可运行的提交随机数示例，在执行前，请先确保执行的账户中有足够的HRG Token.
                             </p>
                               <pre>
            # git clone https://github.com/hpb-project/SRNG
            # cd SRNG
            # npm install
            # // 手动修改 runcommiter.sh 中的 PRIVATE_KEY 填入执行账户的私钥. 
            # ./runcommiter.sh
                            </pre>

                            <p class="text2em">
                                2. 消费者如何使用随机数
                            </p>
                            <p  class="ml-3">
                                消费者可以在 https://rc.hpb.io/purchase 上体验直接订阅随机数以及使用合约订阅随机数，还可以基于示例合约开发自己的合约来使用随机数。具体操作步骤见<a href="https://shimo.im/docs/N2A1MVzwmEf5vAD1/" target="_blank">HRG订阅随机数操作手册</a>HRG订阅随机数操作手册。
                            </p>
                            <p class="ml-3">
                                  这里有完整的可运行的消费合约示例，在执行前，请先确保执行的账户中有足够的 HRG Token.
                            </p>
                            <pre>
            # git clone https://github.com/hpb-project/SRNG
            # cd SRNG
            # npm install
            # // 手动修改 runconsume.sh 中的 PRIVATE_KEY 填入执行账户的私钥. 
            # ./runconsume.sh
                            </pre> 
                        </section>
                            
                        <section>
                            <h5> HRG 经济模型</h5>
                           <p class="text2em">HRG 发行 HRG Token 作为系统的流通货币，总量发行 100,000,000 枚.</p> 
                        </section> 
                        
                         <section>
                            <h5> Token 分配 </h5>
                            <ul class="ml-2">
                                <li><p>50% 通过挖矿产出</p> </li>
                                <li><p>20% 用于募集资金</p></li>
                                <li><p>15% 用于开发者社区活动</p></li>
                                <li><p>5% 用于空投活动</p></li>
                                <li><p>10% 分配给项目团队，初始释放 10%，剩余部分分3年释放完</p></li>
                            </ul>
                        </section>

                           
                        <section>
                            <h5> 挖矿奖励算法.</h5>
                            <p class="text2em"> 用户参与提交随机数都可以获得挖矿奖励。</p>
                             <ul class="ml-2">
                                <li><p>初始阶段，用户完成种子验证之后，给与 1 HRG奖励；</p> </li>
                                <li><p>当奖励数量每达到剩余总量的50%时，奖励开始减半; </p></li> 
                            </ul>
                             <p class="text2em"> 举例说明：挖矿总数量为 50,000,000 HRG, 当奖励数达到 25,000,000 之后，每次奖励 0.5 HRG； 当奖励总数达到 37,500,000 后，每次奖励 0.25 HRG。</p>
                        </section>

                    

                        <section>
                            <h5> 局限性</h5>
                            <p class="text2em">   为了维护系统的健康发展，对用户的操作有以下几项限制：</p>
                              <ul class="ml-2">
                                <li><p>不可提供重复的种子和种子哈希</p></li>
                                <li><p>第一阶段提交和第二阶段验证之间至少要间隔1个区块</p></li>
                                <li><p>第二阶段提交必须在第一阶段提交之后的200个区块内完成，否则将不能执行第二次提交，质押金不予退回</p></li>
                                <li><p>提交者最多只能有100000个未验证的Commit存在，达到之后不能再提交新的Commit</p></li> 
                            </ul>
                        </section>
                    </div>


                </div>
            </div>
        </div>
        <Footer></Footer> 
    </div>
</template>
<script>
import Footer from '../components/Footer.vue';
export default {
    name: "DocumentPage",
    components: { Footer },
    computed: {
        getLanguage() {
            return this.$i18n.locale;
        }, 
    },
    watch: {
        getLanguage: { 
        handler: function (newval) {
            const that = this;
            if (that.table) {
            $(that.mySubmitTableName).dataTable().fnDestroy();
            that.initTable(this.mySubmitList); 
            }
        },
        },
    }
}
</script>
<style >
    
</style>
