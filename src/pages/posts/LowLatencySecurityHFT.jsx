import React from 'react';
import CodeBlock from '../../components/CodeBlock/CodeBlock';
import { useTheme } from '../../context/ThemeContext';

const LowLatencySecurityHFT = () => {
  const { theme } = useTheme();

  return (
    <>
      <p>
        Recently, I had been learning about systems which work at a blazing speed that is measured in a unit as low as Nanoseconds!! For those wondering, this is equivalent to - 1/1,000,000,000 seconds!! A speed which can barely be felt by us. This got me wondering "How are these systems even secure to perform multi-million dollars worth of trades every second???" And this question made me explore a whole new aspect of these systems → "SECURITY"
      </p>

      <p>
        To get a better understanding of why this topic is so important let us understand with an example - 
      </p>

      <p>
        Let us say I have a hedge fund trying to make a hefty amount of money by trading in the blink of an eye. At <strong>10 microseconds per trade</strong>, my system could theoretically execute around <strong>100,000 trades every second</strong>. Now if due to additional overhead (for example, security checks or extra software layers), the time per trade increases to <strong>10 milliseconds</strong> (which is still fast in normal computing), the system throughput drops to:
      </p>

      <p style={{ textAlign: 'center', fontSize: '1.2rem', margin: '1.5rem 0' }}>
        <span style={{ fontFamily: 'monospace' }}>1/10ms = 100 trades/sec</span>
      </p>

      <p>
        This means we effectively lose <strong>99,900 trades per second</strong>. If each trade costs just <strong>$0.01</strong>, that is a loss of roughly <strong>$999 per second</strong>, which becomes nearly <strong>$60,000 per minute</strong>. This is why ultra-low-latency systems require security mechanisms that do not introduce unpredictable delay.
      </p>

      <p>
        This is why the concepts of low latency security is a vital part of high-frequency trading!!
      </p>

      <h2 id="anatomy-of-packet">1. THE ANATOMY OF A PACKET'S JOURNEY</h2>

      <p>
        Whenever you open instagram, browse youtube or twitter, make a google search or even play an online game, your device is constantly receiving and sending information in form of PACKETS. A packet is basically just a structured bundle of information which contains credentials such as 'Who sent it', 'To whom is this being sent', 'Security credentials' etc. In normal systems, your application never interacts with the packets directly, instead your operating systems act as the gatekeepers or bodyguards that keep you secured from all the vulnerabilities you can possibly have due to the packets.
      </p>

      <h3 id="spaces">1.1 SPACES</h3>

      <p>
        This is a basic concept of operating system. In simple words, a kernel space is a dedicated space given to any application for performing their tasks and using the resources according to the allocation. There are two kernel spaces- 
      </p>

      <ol>
        <li><strong>User space</strong> - This is where all the user applications run. This space is restricted and doesn't have the rights to perform any random task without a proper inspection and resource allocation.</li>
        <li><strong>Kernel Space</strong> - This is the "God Mode" of all spaces. This space has all the control over hardware, memory, process scheduling, device drivers, OS-level security controls etc. It controls the device completely and if it crashes, the entire system crashes!!</li>
      </ol>

      <h3 id="packet-travel">1.2 UNDERSTANDING HOW A PACKET TRAVELS</h3>

      <p>The process is simple:</p>

      <ol>
        <li><strong>The packets arrive at your NIC card.</strong></li>
        <li><strong>NIC receives and generates an interrupt.</strong> This basically just means it tells the system "Hey!! I have received a packet OS, you gotta check this out!!" This forces the CPU to stop whatever it is doing and prioritise the packets.</li>
        <li><strong>Packet is placed into ring buffer</strong> - This is basically a CIRCULAR QUEUE IN RAM. The ring buffer places all the packets in this queue and the packets are then being checked by the kernel.</li>
        <li><strong>Kernel checks and starts decoding the packet</strong> - 
          <ul>
            <li>Layer-2 ⇒ MAC address validation, frame checks</li>
            <li>Layer-3 ⇒ IP routing rules, TTL checks, fragmentation handling</li>
            <li>Layer-4 ⇒ Port numbers, checksums, connection state</li>
          </ul>
          At every stage the kernel performs all the checks on packet to ensure that it is authentic and secured.
        </li>
        <li><strong>Finally the application is allowed to read the data.</strong> The kernel transfers data into application memory and only after this does the application get access to all the raw data.</li>
      </ol>

      <h3 id="security-benefits-drawbacks">1.3 Security benefits & drawbacks</h3>

      <p>
        As we can see, this process provides a massive security benefit. We can rest assured that no false or manipulative packets will enter our system because of the thorough checks and filtering. But as we know, every good thing comes with drawbacks which in this case, is latency. The whole process is very secure, but it takes significant time, even though we're talking about microseconds. Every layer just adds extra delay → hardware interrupts, context switching, multiple memory copies, firewall rule evaluation. In normal computing, these are just tiny delays, but for it to fit in application of FAST COMPUTATION, this is still very slow!!
      </p>

      <h2 id="understanding-hft">2. UNDERSTANDING HFT AND THE NEED FOR SPEED</h2>

      <p>
        High frequency trading is done in the span of Nanoseconds and microseconds which are blazing fast!! And it's not just about speed in here, the success of an HFT depends on two things - 
      </p>

      <ol>
        <li><strong>Latency</strong> → How fast can your system react??</li>
        <li><strong>Determinism</strong> → How consistently can you persist the reaction time???</li>
      </ol>

      <h3 id="nanoseconds-microseconds">2.1 Nanoseconds vs Microseconds vs Milliseconds</h3>

      <p>
        In normal computing, adding a few milliseconds doesn't feel like a lot. Even games running at 60 FPS allow around <strong>16 milliseconds per frame</strong> and it feels smooth.
      </p>

      <p>But in HFT, time is measured in:</p>

      <ul>
        <li>1 millisecond (ms) = 1/1000 sec</li>
        <li>1 microsecond (µs) = 1/1,000,000 sec</li>
        <li>1 nanosecond (ns) = 1/1,000,000,000 sec</li>
      </ul>

      <p>
        Thus, if your competitor reacts even 2 microseconds faster, they literally SEE the market earlier than you!!
      </p>

      <h3 id="jitter">2.2 Jitter!!</h3>

      <p>
        In network security, we generally care about "Delay", but in HFT, engineers care something even more scary → JITTERRRSSS!!!
      </p>

      <p>
        Jitters are basically just variations in delay, meaning, the inconsistencies in the delays for different packets. One packet might consume 5 microseconds, while the other would consume 50 microseconds of time, which really destabilizes the trading strategies. Thus, in HFTs, the goals are speed, repeatability, predictability and consistency.
      </p>

      <h2 id="kernel-bypass">3. Kernel Bypass</h2>

      <p>
        Let us just gather up the whole process we have learnt till now. The flow of whole process is  - 
      </p>

      <div style={{ margin: '2rem 0', textAlign: 'center' }}>
        <img 
          src={theme === 'dark' ? '/blog_images/DARK_MODE.png' : '/blog_images/LIGHT_MODE.png'}
          alt="Packet Flow Diagram" 
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            borderRadius: '8px',
            display: 'block',
            margin: '0 auto'
          }} 
        />
      </div>

      <p>
        Yes this is secure, but it's just TOO SLOOWWWW!!  To overcome this, HFT firms do something amazing, which is called KERNEL BYPASS.
      </p>

      <h3 id="why-kernel-slow">3.1 WHY DOES KERNEL SLOW DOWN THINGS?</h3>

      <p>
        When packets arrive normally, we have multiple layers of overhead wherein we have to perform interrupts, parse ethernet/IP/TCP header, validate checksums, manage TCP connection, decide which socket gets this data, apply firewall policies, blah blah blah.. All of this is secure of course but for HFTS, it's like asking a formula one car to take pit stops at every lap!! Thus, it is not only slow, but it is not deterministic either… It cannot guarantee a constant checking time for all the packets, and sometimes kernel would prioritize other tasks, which causes jitters.
      </p>

      <h3 id="what-is-kernel-bypass">3.2 WHAT IS KERNEL BYPASS??</h3>

      <p>
        We saw that there is a whole lot of headache in order to check a packet, it goes from application space to kernel, then from kernel to application. It involves too many context switches!! How about this - Instead of going to the kernel, application itself reads the packets from NIC Buffers??!! 
      </p>

      <p>
        The core idea behind kernel bypass is this → IT IS A TECHNIQUE WHERE THE NETWORK PACKETS DO NOT GO THROUGH THE OS KERNEL NETWORKING STACK AND ARE INSTEAD DELIVERED DIRECTLY TO THE USER-SPACE APPLICATION.
      </p>

      <p>
        So now, the path becomes NIC → APPLICATION instead of NIC→ KERNEL →APPLICATION
      </p>

      <h3 id="the-conflict">3.3 THE CONFLICT</h3>

      <p>
        This is where we hit the REALITY CHECK. In standard systems you have the kernel who does all the checking for us and makes sure that the system is safe, but in high frequency trading, it is too slow… In HFT, while the system is checking for issues in packets, the trade has already been completed!! This results in problem - YOU HAVE NOW ZERO PROTECTIONS!! Thus, no system is now able to check for security of packets and you have no guarantee about any packet making the whole system insecure and vulnerable to every possible kind of an attack.
      </p>

      <h2 id="safety-with-speed">4. SAFETY ALONG WITH SPEED</h2>

      <p>
        Here starts the most critical part of this blog. We did understand that HFTs use kernel bypassing to remove latency and jitter, but at the same time it means - 
      </p>

      <ul>
        <li>OS firewall is bypassed</li>
        <li>Kernel protocol validation is bypassed</li>
        <li>packets hit application almost raw</li>
        <li>attack surface becomes extremely dangerous</li>
      </ul>

      <p>
        Thus, a question arises - "How are HFT systems still secure if they bypass so many protections??"
      </p>

      <p>
        The answer to this is - "They do not rely on a single security component, instead they build a low-latency multi-layered security" In other words, it is carefully designed system where each layer doesn't just add enough security without adding significant delay.
      </p>

      <p>Unlike normal networks, HFT has a slightly different priority order-</p>

      <ol>
        <li><strong>Integrity (Extremely Important)</strong> - Market data and trading messages must be correct, if someone manipulates the market feed, order acknowledgement, sequence numbers or prices/order book updates, the algorithm can place wrong trades.</li>
        <li><strong>Availability</strong> - In normal systems, if server goes down for 5 seconds it's annoying. Imagine how much 5 second breakdown could cost a HFT!!</li>
        <li><strong>Confidentiality</strong> - Since market data is publicly available, this part is not always the top priority of trading pipelines, but many hfts do run on private fiber links or maybe isolated VLANs. So, instead of using heavy encryption everywhere, firm focuses more on availability and integrity.</li>
      </ol>

      <p>
        Thus, the main idea is that, in HFT the security is NOT MAXIMUM EVERYWHERE, it is just enough security where it matters the most without adding any jitters or latency. This is the reason HFT firms use multi-layer security architecture.
      </p>

      <h2 id="multi-layer-security">5. MULTI-LAYER SECURITY ARCHITECTURE</h2>

      <p>
        Now that we know kernel bypass removes traditional OS-level protections, the question is - If the kernel is no longer protecting the system, what exactly is??
      </p>

      <p>
        Multiple protection layers are added in order to protect the entire system from malicious packets!! HFT is designed like a pipeline where each stage filters risk without slowing the main trading path.
      </p>

      <p>We can break the process of security in 4 layers namely - </p>

      <ol>
        <li>Physical Isolation</li>
        <li>Network Segmentation</li>
        <li>Hardware Filtering</li>
        <li>Application-Level Validation</li>
      </ol>

      <p>Let us understand each one of the above in detail.</p>

      <h3 id="physical-isolation">5.1 Layer-1 : Physical Isolation</h3>

      <p>
        This is not a technical layer of protection, but rather a physical protection which just involves protecting the servers from any physical attack by anyone. Most HFT systems run inside exchange datacenters. This gives them dedicated cages, direct cross-connects, strict datacenter access rules and highly controlled switch ports. This layer is pretty underrated but it is very very important. An attacker cannot just reach the trading system from internet like a normal server, instead they would need to physically access the datacenter infrastructure or compromise inside the exchange network or get some insider information. There's no rocket science here it's simply protecting the datacenters that's all.
      </p>

      <h3 id="network-segmentation">5.2 Network segmentation</h3>

      <p>
        In a standard enterprise network, security is often "flat," meaning once you are past the firewall, you can move around relatively freely. In Low-Latency Trading, we design the network like a military compound using SEGMENTATION OF NETWORKS. By segmenting the network into distinct Virtual LANs (VLANs), we ensure that different responsibilities never cross paths. For instance, the Market Data VLAN, which ingest massive amounts of external data, is physically and logically isolated from the Execution VLAN, where the actual buy/sell orders are sent.
      </p>

      <p>
        This segmentation is enforced at the hardware level using Switch Access Control Lists (ACLs) and port isolation. If a hacker manages to compromise a non-critical Admin server, the "Blast Radius" is contained & they physically cannot jump into the execution path to inject fraudulent trades. This provides incredibly robust security with effectively zero added latency, as the hardware switches handle these rules at wire speed.
      </p>

      <h3 id="hardware-filtering">5.3 Hardware Filtering</h3>

      <p>
        Even with the physical Isolation and segmentation there are still high possibilities of something malicious reaching the trading wire. This is where Hardware filtering comes in. We will discuss this part in a few moments in the next section as this is one of the interesting parts and shows actual functioning of KERNEL BYPASS.
      </p>

      <h3 id="application-validation">5.4 Application Level Validation</h3>

      <p>
        After all the hardware filtering is complete, we still need to make sure that the software part/ application part is top notch. No matter if the other filtering layers filter out most of the data, if your application layer which makes the trades for you is malfunctioning then it is going to be a big big disaster for your firm XD. Just imagine it making a trade of $100,000 because of receiving wrong signal despite filtering and misinterpreting the market?? That'd be disaster!!
      </p>

      <p>
        Even after FPGA filters, many bad packets might still be transferred and they might be valid-looking packets that carry the wrong data or packets that are technically correct but are malicious or corrupted sequences due to loss/reorder or delayed or replayed updates. Thus the application must do two jobs - ensure that the data is correct and make sure that the data is SANE, which means, it should ask "DOES THIS ACTUALLY MAKE ANY SENSE IN REAL LIFE??"
      </p>

      <ul>
        <li><strong>Protocol-Level Validation</strong> - This is simple, the application only needs to validate if the message is valid as per the feed protocol. It means that the messages have strict formats like message types, message lengths, sequence numbers, timestamps, checksums, expected field etc. Thus, the application just makes sure that the packets follow protocols perfectly by making sure that the packets are correctly formatted according to the defined protocol. Mini pseudocode-</li>
      </ul>

      <CodeBlock
        language="cpp"
        filename="validation.cpp"
        code={`if (msg.length < MIN_LEN || msg.length > MAX_LEN) drop();
if (!isKnownType(msg.type)) drop();
if (!validChecksum(msg)) drop();`}
      />

      <ul>
        <li><strong>Sequence Integrity</strong> - Market data is usually sequenced i.e., every packet is sequentially behind each other. If the prices rise by 5$ per second and if the sequence is missing where the price rises directly by $15, it provides massive errors. Thus we must make sure that if the system receives packets that are not sequential, it just ignores those packets and doesn't trade. A simple logical program demonstrating this could be -</li>
      </ul>

      <CodeBlock
        language="cpp"
        filename="sequence-check.cpp"
        code={`if (msg.seq != expected_seq) {
    trigger_recovery();
    pause_trading();
}
expected_seq++;`}
      />

      <ul>
        <li><strong>Anti-replay protection</strong> - Attackers or network glitches can cause replayed packets which can be old messages resent or duplicate order book updates. Thus the app must reject those packets with duplicate sequence numbers of packets with old timestamps.</li>
        <li><strong>Market sanity checks</strong> - If the packet is perfectly formatted and sequenced it might still contain bad data. For instance the price may become 0, or the quantity becomes negative or the bid outnumbers asks.. Thus, the app needs to check the market sanity to make sure no irresponsible and wrong trades are being placed.</li>
        <li><strong>Risk controls</strong> - This might sound funny but it's so true! You must also secure the system against your OWN algorithms XD. Sometimes the danger isn't the attacker, it's a bug. So HFT systems enforce controls like maximum order size, maximum order rate, maximum position exposures or maximum loss limits. If the algorithm is hacked or malfunctions, it cannot nuke the account.</li>
      </ul>

      <h2 id="physical-protection">6. Physical Protection</h2>

      <h3 id="fpga-working">6.1 Working</h3>

      <p>
        Even with perfect segmentation, we must assume the worst→ What if a malicious packet reaches the trading wire? Since we've bypassed the Kernel, we don't have a software firewall to catch it. This is where the Field Programmable Gate Array (FPGA) enters as the ultimate game-changer.
      </p>

      <div style={{ margin: '2rem 0', textAlign: 'center' }}>
        <img 
          src="/blog_images/FPGA.png" 
          alt="FPGA Architecture" 
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            borderRadius: '8px',
            display: 'block',
            margin: '0 auto'
          }} 
        />
      </div>

      <p>
        Unlike a CPU, which fetches and executes instructions one by one, an FPGA is a "blank slate" of hardware that we program to be a specific circuit. It doesn't "run" a firewall program, it is the firewall. By placing an FPGA-enabled SmartNIC between the fiber-optic wire and the CPU, we create a hardware-level checkpoint. The packet path becomes: NIC Wire → FPGA Filter → User Space. The trading application receives "clean" data, enjoying kernel-like protection without the kernel-level delay.
      </p>

      <p>
        In a traditional firewall, a packet is received, stored in memory, and then checked against a list of rules, a process that is slow and unpredictable. An FPGA performs <strong>Wire-Speed Filtering</strong>. As the bits of a packet fly across the silicon, the FPGA parses the Ethernet, IP, and UDP headers in a "Pipeline." Imagine it as a train I guess. Imagine a train passing by at the speed of 300 kmph, you keep looking at the train, but don't stop it!! But if you find some error in the train, you fire a stamp on its trailer telling the system "IT IS NOT SECUREEEE!!". And when it reaches the destination, if the receiver finds a stamp, it just discards that train making sure that the wrong train is not allowed to enter the platform.
      </p>

      <p>
        For a 200 MHz FPGA, each logic stage takes only 5 nanoseconds. Even a complex 8-stage security pipeline would only add about 40 nanoseconds of latency, a feat impossible for even the most optimized CPU!!
      </p>

      <p>
        The FPGA mitigates DUPLICATE DATA by filtering the traffic. It can deduplicate packets and normalize data formats in hardware, ensuring the CPU only sees a stable, clean stream of information. By enforcing "Protocol Sanity," the FPGA ensures that no "Ping of Death" or edge-case packet ever reaches the application memory, effectively preventing buffer overflows or logic crashes before they can even begin.
      </p>

      <h3 id="advanced-concepts">6.2 Some advanced concepts &#123;for advance readers&#125;</h3>

      <p>
        Since FPGAs are programmed using Hardware Description Languages (HDL) like Verilog or VHDL, the code looks very different from C++ or Python. In an FPGA, everything happens in parallel. We don't use "if-statements" that wait for a processor; we build logic gates that check bits as they fly past. Below is a simplified Verilog module for a Hardware Firewall. This module inspects a packet's Source IP and Destination Port at "wire-speed."
      </p>

      <p>
        In this example, the FPGA is looking at a streaming data bus (like AXI-Stream). It checks if the incoming packet matches our "Trusted Trader" IP and the "Exchange" Port. If it doesn't match, it asserts a <code>drop</code> signal in the very next clock cycle.
      </p>

      <CodeBlock
        language="verilog"
        filename="packet_filter.v"
        code={`// Simple FPGA Hardware Firewall Module
// This module checks a 32-bit data bus for specific IP/Port signatures
module packet_filter (
    input wire clk,                 // System Clock (e.g., 200MHz)
    input wire reset,               // System Reset
    input wire [63:0] rx_data,      // 64-bit data chunk from the wire
    input wire data_valid,          // High when data is actually passing
    input wire [3:0] byte_offset,   // Indicates which part of the header we are in
    output reg drop_packet          // Signal to the NIC to kill the packet
);

    // Configuration: Our "Trusted" parameters
    parameter TRUSTED_IP   = 32'hC0A8010A; // 192.168.1.10 in Hex
    parameter EXCHANGE_PORT = 16'h1F90;     // Port 8080

    // Internal state to track where we are in the packet
    always @(posedge clk) begin
        if (reset) begin
            drop_packet <= 1'b0;
        end else if (data_valid) begin
            
            // Stage 1: Check IP Header (Assuming IPv4 offset)
            // In a real FPGA, we use a 'counter' to know which byte is passing
            if (byte_offset == 4'd2) begin 
                if (rx_data[31:0] != TRUSTED_IP) begin
                    drop_packet <= 1'b1; // Not our trader? DROP.
                end
            end

            // Stage 2: Check UDP Port
            if (byte_offset == 4'd3) begin
                if (rx_data[15:0] != EXCHANGE_PORT) begin
                    drop_packet <= 1'b1; // Wrong Port? DROP.
                end
            end
        end else begin
            drop_packet <= 1'b0; // Reset for next packet
        end
    end
endmodule`}
      />

      <p>
        <strong>** Credits to Gemini for giving me this code XD **</strong>
      </p>

      <p>
        Notice there are no <code>for</code> loops, pretty weird for me to be honest. The FPGA checks the IP at <code>byte_offset 2</code> and the Port at <code>byte_offset 3</code>. Because this is a pipeline, the FPGA can start checking the IP of *Packet B* while it is still finishing the Port check of *Packet A*. This is how HFT systems handle 10 million packets per second without breaking a sweat.
      </p>

      <h2 id="attacks">7. ATTACKS ON LOW-LATENCY TRADING</h2>

      <p>
        Now that we have understood basic working of whole system, we must now understand - WHAT ARE WE PROTECTING OURSELVES AGAINST??
      </p>

      <p>
        Unlike normal hacking where the attackers just steal passwords or infiltrate systems to gain access and information, in HFT, the main aim of attackers is to STEAL TIME!! Sounds so fun isn't it!!
      </p>

      <p>Why?? Simple &gt;&gt; SLOWER YOU ARE, MORE IS THE LOSS</p>

      <p>Thus attacks in HFT are mainly aimed at - </p>

      <ol>
        <li>Creating latency or jitter spikes</li>
        <li>Disrupting time sync</li>
        <li>making algorithm see wrong reality</li>
        <li>injecting wrong market data</li>
      </ol>

      <h3 id="attack-types">7.1 Some attacks on HFTs</h3>

      <ol>
        <li><strong>Market data feed manipulation</strong> - This is the most direct attack against integrity as the name itself suggests. Attacker might just send fake/modified market packets. Even if this is done for a short time it can cause a lot of trouble in terms of losses occurring after this. Assume an algorithm is triggered when Price &gt; 150$, if the attacker manipulates the price into $160, the algorithm buys aggressively and loses all the money :)</li>
        <li><strong>Replay Attacks</strong> - Attacker sends the old packets again and again. It is not necessary that this might be an attack all the times, it is also possible that there are network glitches which are causing duplicates. This can be prevented at application level validation by rejecting old timestamps and duplicate sequence numbers.</li>
        <li><strong>Micro DDoS / Jitter injection</strong> - This is extremely common conceptually. In normal attacks the attackers try to crash services on networks, it's similar here. The attackers just need to introduce minor latency, small jitter spikes or micro bursts.</li>
        <li><strong>Order execution path attacks</strong> - The order execution channel is serious business and if the attackers manage to interfere here, they can perform fake order injections, replay cancellations, modify quantities or prices, and delay acknowledgements. Even one fake order can cause major losses for compliance issues. It can be prevented by having strict authentication on execution gateways, access control, segmentation and risk control measures in app.</li>
      </ol>

      <h3 id="ptp-attacks">7.2 PTP ATTACKS (Time Heist)</h3>

      <p>
        This is the most unique security threat. HFTs use PRECISION TIME PROTOCOL - IEEE 1588. It uses a grandmaster clock as its time source, communicating using SYNC and FOLLOW UP messages and DELAY REQUEST/REPLY to calculate network latency and correct clock drift ensuring that the time is distributed precisely over the internet. It has a master-slave hierarchy where Grandmaster Clock acts as a master synchronizing other devices connected to it. By hardware-timestamping packets, the system can calculate the exact travel time over the wire and sync the server's clock to within <strong>100 nanoseconds</strong> of the real time. Now let us understand how the "Heist" happens - 
      </p>

      <p>
        The "Time Heist" is a sophisticated Man-in-the-Middle (MitM) attack specifically targeting these sync packets. An attacker doesn't need to change the content of the packet; they just need to change its timing.
      </p>

      <ol>
        <li>The attacker sits on a switch between the Grandmaster and the Slave (the trading server). They capture the PTP Sync packet and hold it for just 500 nanoseconds before releasing it.</li>
        <li>Because the packet arrived late, the trading server calculates the wrong "Path Delay." It believes its internal clock is behind and "corrects" it.</li>
        <li>Suddenly, the trading server's internal clock has drifted away from the Exchange's clock.</li>
      </ol>

      <p>
        To defend against the Time Heist, HFT firms use PTP-aware switches that can detect if a sync packet has been delayed or tampered with.
      </p>

      <h2 id="conclusion">8. Bye bye!!</h2>

      <p>
        It's time to wrap up!! Although this blog was just a basic introduction to certain concepts of security running behind trading systems in order to protect them along with making sure that the systems function in nanoseconds. We first learnt how normal packets transfer from one place to another, then we understood how low-latency systems work, later on we explored how the systems are protected along with high speed networking environment, followed up with the concepts of FPGA and then we learnt some attacks.
      </p>

      <p>
        The lesson of HFT is that Performance and Security are not enemies. When we move security from software to hardware, we don't just make it faster; we make it more deterministic and harder to bypass. In the future of networking, 'Wire-Speed Security' will be the standard, not the exception.
      </p>
    </>
  );
};

export default LowLatencySecurityHFT;
