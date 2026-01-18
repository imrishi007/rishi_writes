import React, { useEffect } from 'react';

const NeuralNetworksGuide = () => {
  useEffect(() => {
    // Re-render MathJax when component mounts
    if (window.MathJax) {
      window.MathJax.typesetPromise && window.MathJax.typesetPromise();
    }
  }, []);

  return (
    <div className="blog-content">
      <section>
        <h2 id="intro">Introduction</h2>
        <p>A few years ago, several <strong>groundbreaking AI models</strong> like GPTs started emerging, and, like everyone else, I was <strong>obsessed</strong> with using them for my own projects. I had <strong>no idea</strong> how they worked, but I found them <strong>fascinating</strong>.</p>
        <p>Then, as I started my graduation and dived deeper into <strong>programming</strong>, I began to understand how computers process <strong>information</strong>—at their core, they only understand bits: <strong>0s and 1s</strong>. Yet, we’ve developed <strong>programming languages</strong> that allow us to communicate <strong>complex instructions</strong> effortlessly. That realization sparked my <strong>curiosity</strong> about <strong>Machine Learning</strong> and <strong>Neural Networks</strong>. Wanting to learn more, I started researching online and recently watched <strong>3Blue1Brown’s videos</strong> on neural networks. It’s <strong>incredible</strong> how our brains perform <strong>complex tasks</strong> with such ease, and the idea of making a computer <strong>think like us</strong> feels almost <strong>magical</strong>.</p>
        <p><strong>Neural networks</strong> are a <strong>fascinating field</strong>—one that blurs the line between <strong>human intelligence</strong> and <strong>artificial intelligence</strong>. In this blog, I’ll share my <strong>journey</strong> of understanding neural networks from the ground up, breaking down concepts in a way that’s <strong>easy to follow</strong>. Whether you're a <strong>beginner</strong> or just <strong>curious</strong> about how AI works, this guide will give you a <strong>solid foundation</strong>. Let’s <strong>dive in</strong>!</p>
      </section>

      <section>
        <h2 id="what-is-nn">What Actually Is a Neural Network?</h2>
        <p>Let's kick things off with a <strong>fun exercise</strong>. Picture this: you're shown a <strong>blurry image</strong> of a number—say, a fuzzy outline of a "<strong>9</strong>."</p>
        <img src="/media/nine.png" alt="Blurry number 9" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '2rem auto' }} />
        <p>So, what do you see? Probably a "<strong>9</strong>," right? Even though the image isn’t <strong>crystal clear</strong>, your brain leaps into action and <strong>recognizes</strong> it immediately. It’s as if your mind is saying, "<strong>I got this</strong>!"</p>
        <p>But how did you figure it out so <strong>quickly</strong>? And more <strong>intriguingly</strong>, how can a computer do the <strong>same thing</strong>? Enter the world of <strong>neural networks</strong>. At their core, neural networks are <strong>computer systems</strong> inspired by the human brain’s ability to process and recognize <strong>patterns</strong>. Think of them as a <strong>digital mimic</strong> of how our brains work:</p>
        <p>• <strong>Raw Input</strong>: Just like your eyes pick up <strong>pixels</strong> from an image, the first layer of a neural network takes in <strong>raw data</strong> (in this case, the blurry pixels of our number).<br />
        • <strong>Simple Patterns</strong>: As the data moves through the network, the first few layers start identifying simple patterns—<strong>edges</strong>, <strong>curves</strong>, or <strong>angles</strong>.<br />
        • <strong>Complex Understanding</strong>: Deeper into the network, these simple patterns combine to form a more <strong>complex understanding</strong>, much like piecing together a <strong>jigsaw puzzle</strong> until the complete picture of the "<strong>9</strong>" emerges.</p>
        <p>Imagine trying to solve a <strong>puzzle</strong> where each piece alone doesn't make much <strong>sense</strong>, but once they click together, you see a <strong>clear picture</strong>. Neural networks <strong>learn</strong> by connecting lots of little pieces of <strong>information</strong>, gradually building up to a <strong>confident answer</strong>.</p>
        <p>The <strong>beauty</strong> of neural networks is that, much like us, they <strong>learn over time</strong>. They make <strong>mistakes</strong>, <strong>adjust</strong>, and eventually become really good at recognizing <strong>patterns</strong>—be it a blurry number, a friend’s <strong>face</strong>, or even something entirely <strong>different</strong>.</p>
        <p>In short, a neural network is a <strong>system</strong> that learns to recognize <strong>patterns</strong> in a way that’s remarkably similar to our own <strong>brains</strong>. And just as you might marvel at how effortlessly you recognize a number in a <strong>blur</strong>, neural networks <strong>amaze</strong> us by teaching computers to see the world in a whole <strong>new light</strong>.</p>
      </section>

      <section>
        <h2 id="building-blocks">Building Blocks of Neural Networks</h2>
        <p>Now that we've taken a peek at the <strong>big picture</strong>, let's break down what goes into building a <strong>neural network</strong>. Think of it like assembling your favorite <strong>sandwich</strong>—each ingredient adds its own <strong>flavor</strong> and <strong>purpose</strong>. In our case, the "<strong>ingredients</strong>" are <strong>neurons</strong>, <strong>layers</strong>, <strong>weights</strong>, and <strong>biases</strong>, all coming together to make a <strong>model</strong> that can <strong>learn</strong> and <strong>decide</strong>. Let's understand each one of them—starting with the most <strong>basic element</strong>: the <strong>neuron</strong>.</p>
      
        <h3 id="neurons">Neurons</h3>
        <p><strong>Neurons</strong> are the <strong>fundamental units</strong> of a neural network—they’re essentially the <strong>decision makers</strong>. In a computer, these neurons are represented by <strong>numbers</strong>, typically values between <strong>0</strong> and <strong>1</strong>, which capture the <strong>information</strong> we feed into the network. Think of these numbers as tiny <strong>messengers</strong> that carry bits of information from one <strong>layer</strong> to the next.</p>
        <p><img src="/media/neuralnetworks.png" alt="Diagram of Neural Networks" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '2rem auto' }} /></p>
        <p>For example, imagine you have an <strong>image</strong> that is <strong>40 by 40 pixels</strong>. Each <strong>pixel</strong> in this image has a <strong>brightness value</strong>, which can be normalized to a number between <strong>0</strong> and <strong>1</strong>. If you consider each pixel as a <strong>neuron</strong>, then your <strong>input layer</strong> for this image would consist of <strong>1,600 neurons</strong> (since 40 × 40 = 1,600). Each neuron stores the <strong>brightness information</strong> of its corresponding pixel.</p>
        <p>As the <strong>data</strong> flows through the network, it doesn’t just pass through <strong>unchanged</strong>. Instead, it is processed in successive <strong>layers</strong>. In these <strong>hidden layers</strong>, the network begins to extract <strong>patterns</strong> and <strong>features</strong> from the <strong>raw data</strong>. Often, the number of neurons <strong>decreases</strong> with each layer, as the network condenses the information into a more <strong>abstract form</strong>. By the time the data reaches the <strong>final layer</strong>, you might have a much smaller set of <strong>neurons</strong>—say, <strong>10 neurons</strong> for a digit recognition task. Each of these final neurons represents one of the <strong>digits</strong> from <strong>0 to 9</strong>. The neuron that ends up with the <strong>highest activation</strong> is typically interpreted as the network's <strong>prediction</strong> for what digit the image represents.</p>
        <p>This gradual <strong>reduction</strong>—from a high number of neurons capturing <strong>detailed</strong>, raw data, down to a few neurons representing <strong>abstract</strong>, classified <strong>concepts</strong>—is a <strong>core principle</strong> of how neural networks <strong>function</strong>. Every neuron in the network plays a <strong>role</strong> in transforming the input data into a <strong>decision</strong> or <strong>prediction</strong>.</p>
        
        <h2 id="activation-functions">Activation Functions: The Decision-Making Helpers</h2>
        <p>So, we know that <strong>neurons</strong> are the <strong>decision-makers</strong> of a neural network. But what actually helps those neurons decide whether to <strong>fire</strong> or not? That's where <strong>activation functions</strong> come into play.</p>
        <p>Imagine a neuron gathering a bunch of <strong>inputs</strong>, each <strong>weighted</strong> differently, and summing them all up. Without an activation function, this sum would just be a <strong>linear combination</strong>—hardly enough to capture the <strong>intricate patterns</strong> in data. Activation functions add the essential twist of <strong>non-linearity</strong>, allowing neurons to make more <strong>nuanced decisions</strong>.</p>
      
        <h3 id="sigmoid">Sigmoid Activation Function</h3>
        <p>The <strong>sigmoid function</strong> takes any input and <strong>squashes</strong> it into a <strong>smooth curve</strong> that ranges between <strong>0</strong> and <strong>1</strong>. Think of it like a <strong>dimmer switch</strong> for a light: as the input increases, the output gradually moves from "<strong>off</strong>" (close to 0) to "<strong>fully on</strong>" (close to 1). For example, if a neuron receives a sum of inputs that’s just barely enough to pass a <strong>threshold</strong>, the sigmoid function might output a value like <strong>0.4</strong>, indicating a <strong>partial activation</strong>. This is useful for tasks like <strong>binary classification</strong>, where you want to interpret the output as a <strong>probability</strong>.</p>
        <p><em>Example:</em> Imagine you're deciding whether to go outside based on the <strong>weather</strong>. If it's barely <strong>cloudy</strong>, you might be <strong>40%</strong> sure it's going to be a good day—just like the sigmoid function outputting <strong>0.4</strong> for a borderline case.</p>
        <div className="formula" style={{ textAlign: 'center', margin: '2rem 0', fontSize: '1.2rem' }}>
          {'\\( \\sigma(x) = \\frac{1}{1 + e^{-x}} \\)'}
        </div>
        <video autoPlay loop muted playsInline style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '2rem auto' }}>
          <source src="/media/SigmoidAnimation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      
        <h3 id="relu">ReLU (Rectified Linear Unit)</h3>
        <p>On the other hand, <strong>ReLU</strong> (Rectified Linear Unit) is a bit more <strong>straightforward</strong>. ReLU outputs <strong>0</strong> for any <strong>negative input</strong> and simply passes through <strong>positive values</strong> unchanged. It's like a <strong>gate</strong> that only opens when the input is positive. This helps the network learn <strong>faster</strong> because it avoids some of the <strong>complications</strong> that come with smoothly varying outputs. However, if a neuron consistently receives negative inputs, it might "<strong>die</strong>"—meaning it stops contributing to the network because it always outputs <strong>0</strong>.</p>
        <p><em>Example:</em> Imagine a <strong>sensor</strong> that only reacts to <strong>sunlight</strong>. If the input (amount of light) is <strong>negative</strong> (or too dim), it stays off (<strong>0 output</strong>). But as soon as the light is <strong>bright enough</strong>, it instantly starts recording the exact amount of <strong>brightness</strong>. That’s how ReLU behaves—<strong>simple</strong> and <strong>effective</strong> for capturing the necessary signals.</p>
        <p>In summary, activation functions like <strong>sigmoid</strong> and <strong>ReLU</strong> are <strong>critical</strong> because they empower neurons to process the <strong>weighted inputs</strong> in a <strong>meaningful way</strong>, ultimately allowing the neural network to <strong>learn</strong> and make <strong>complex decisions</strong>.</p>
        <div className="formula" style={{ textAlign: 'center', margin: '2rem 0', fontSize: '1.2rem' }}>
          {'\\( \\text{ReLU}(x) = \\max(0, x) \\)'}
        </div>
        <video autoPlay loop muted playsInline style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '2rem auto' }}>
          <source src="/media/ReLUFunction.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section>
        <h2 id="network-structure">Building Blocks of Neural Networks</h2>
        <p>Now that we understand <strong>neurons</strong> and <strong>activation functions</strong>, let’s talk about how neurons are <strong>structured</strong> inside a network and what really makes them <strong>learn</strong>. Neural networks are not just a <strong>random collection</strong> of neurons; they are organized into <strong>layers</strong>, and the real <strong>magic</strong> happens when neurons interact through <strong>weights</strong> and <strong>biases</strong>.</p>
        
        <h3 id="layers">But what are Layers??</h3>
        <p>Imagine a neural network as a <strong>multi-layered cake</strong> (or a burger, if you’re hungry). Each <strong>layer</strong> has a specific <strong>purpose</strong>, and the <strong>information</strong> flows through them in <strong>sequence</strong>:</p>
        <ul>
          <li><strong>Input Layer:</strong> The very first layer where raw data is fed into the network. If we have a 40×40 image, we will have <strong>1,600 neurons</strong> in the input layer, each holding a pixel value (brightness between 0 and 1).</li>
          <li><strong>Hidden Layers:</strong> These are the layers between input and output, where actual computation happens. Each neuron in a hidden layer takes inputs from the previous layer, processes them, and passes the result to the next layer. This is where the network starts to recognize patterns in data.</li>
          <li><strong>Output Layer:</strong> The final layer that gives the network’s prediction. In our digit recognition example, the output layer might have <strong>10 neurons</strong> (one for each digit from 0 to 9), with the neuron having the highest activation indicating the predicted number.</li>
        </ul>
        <video autoPlay loop muted playsInline style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '2rem auto' }}>
          <source src="/media/NeuralNetworkScene.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>The more <strong>hidden layers</strong> we have, the <strong>deeper</strong> the network—hence the term <strong>deep learning</strong>.</p>
        <p>But how do these layers actually <strong>work</strong>? What makes a neuron decide how much <strong>influence</strong> it should have on the next layer? This is where <strong>weights</strong> and <strong>biases</strong> come into play.</p>
        <p>Each connection between neurons carries a <strong>weight</strong>, which determines the <strong>importance</strong> of that connection. If a neuron in the hidden layer receives <strong>input</strong> from multiple neurons in the previous layer, it doesn’t treat all inputs <strong>equally</strong>—it gives more importance to some and less to others. These weights act like <strong>volume knobs</strong>, amplifying or reducing the <strong>signal strength</strong> before passing it forward. Initially, these weights are set <strong>randomly</strong>, but as the network <strong>learns</strong>, they get <strong>fine-tuned</strong> to make better <strong>predictions</strong>.</p>
        <p>But sometimes, just using weights isn’t <strong>enough</strong>. Even if an input is <strong>weak</strong>, it might still need to <strong>activate</strong> a neuron in order for the network to learn properly. That’s where <strong>biases</strong> come in. A bias is like an additional <strong>boost</strong> that shifts the <strong>activation threshold</strong> of a neuron, ensuring that it <strong>fires</strong> even when the weighted input alone isn’t <strong>sufficient</strong>. Think of it as adjusting the <strong>baseline</strong> of a scale—sometimes, you need to tweak the <strong>starting point</strong> so that small signals don’t get <strong>ignored</strong>.</p>
        <p>With layers <strong>organizing</strong> the network, weights determining the <strong>strength</strong> of connections, and biases <strong>fine-tuning</strong> activations, a neural network gradually learns to transform <strong>raw data</strong> into <strong>meaningful decisions</strong>.</p>
      </section>
      
      <section>
        <h2 id="how-learn">How Neural Networks Learn</h2>
        <p>Okay, so we’ve got <strong>neurons</strong>, <strong>layers</strong>, <strong>weights</strong>, and <strong>biases</strong> all set up. But how do these networks actually <strong>learn</strong>? Do they just wake up one day and magically understand everything? Nope, they go through a <strong>process</strong>—just like us when we’re trying to learn a new <strong>skill</strong> (except they don’t <strong>procrastinate</strong> like we do).</p>
      </section>

      <section>
        <h2 id="forward-prop">Forward Propagation</h2>
        <p>Imagine you show our neural network a <strong>40×40 pixel image</strong> of a "<strong>9</strong>". It doesn’t see the 9 like we do; instead, it just gets a long list of <strong>numbers</strong> (pixel brightness values). Now, these numbers travel <strong>layer by layer</strong>, getting multiplied by <strong>weights</strong>, tweaked by <strong>biases</strong>, and transformed by <strong>activation functions</strong>. Finally, the network spits out an <strong>answer</strong>—ideally "<strong>9</strong>" (but sometimes something completely <strong>wrong</strong>, like "<strong>4</strong>" or "<strong>potato</strong>").</p>
        <p>This whole process of passing the <strong>input</strong> forward through the network is called <strong>forward propagation</strong>.</p>
        <video autoPlay loop muted playsInline style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '2rem auto' }}>
          <source src="/media/ForwardPropagationAnimation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
      
      <section>
        <h2 id="loss-function">Loss Function: The "How Bad Did I Mess Up?" Meter</h2>
        <p>So what happens when the network gets the <strong>wrong answer</strong>? Well, we need a way to <strong>measure</strong> how bad the mistake was. That’s exactly what the <strong>loss function</strong> does—it’s like a <strong>strict teacher</strong> who marks how far off the answer was from the <strong>correct one</strong>.</p>
        <p>For <strong>classification tasks</strong> (like recognizing digits), a common choice is <strong>cross-entropy loss</strong>. In simple terms, it <strong>punishes</strong> the network more when it's very <strong>confident</strong> but also very <strong>wrong</strong>—just like how life does when we <strong>overestimate</strong> our skills.</p>
      </section>
      
      <section>
        <h2 id="backpropagation">Backpropagation & Gradient Descent</h2>
        <p>Now, knowing you made a <strong>mistake</strong> is great, but what’s next? The neural network needs to <strong>correct</strong> itself, and that’s where <strong>backpropagation</strong> comes in.</p>
        <p>Backpropagation is like your <strong>brain</strong> after embarrassing yourself in public—it <strong>replays</strong> the mistake over and over, <strong>adjusting</strong> things so it doesn’t happen again. The <strong>error</strong> from the output layer is sent <strong>backward</strong> through the network, tweaking <strong>weights</strong> and <strong>biases</strong> along the way.</p>
        <p>And how do we decide how much to tweak each <strong>weight</strong>? Enter <strong>gradient descent</strong>—basically, the network's way of making <strong>small</strong>, <strong>calculated changes</strong> to gradually <strong>improve</strong>. Think of it like adjusting your <strong>aim</strong> in a game; if you miss a shot, you tweak your aim <strong>slightly</strong> instead of throwing the whole <strong>controller</strong> away.</p>
        <video autoPlay loop muted playsInline style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '2rem auto' }}>
          <source src="/media/backpropagation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>To put it all together, the <strong>learning process</strong> works like this:</p>
        <ol>
          <li><strong>Make a guess</strong> (forward propagation).</li>
          <li><strong>Check how wrong it is</strong> (loss function).</li>
          <li><strong>Adjust to improve</strong> (backpropagation + gradient descent).</li>
          <li><strong>Repeat until it gets good!</strong></li>
        </ol>
        <p>With enough <strong>repetitions</strong>, the network stops being a <strong>clueless mess</strong> and actually gets <strong>good</strong> at recognizing <strong>patterns</strong>.</p>
      </section>
      
      <section>
        <h2 id="applications">Applications of Neural Networks</h2>
        <p>Okay, so we’ve built this <strong>fancy network</strong>—now what? Can it do anything <strong>cool</strong>? Absolutely! Neural networks are <strong>everywhere</strong>, and they power a ton of <strong>stuff</strong> we use daily.</p>
        <ul>
          <li><strong>Image Recognition & Computer Vision:</strong> Face unlock on your phone, self-driving cars, AI detecting if your cat is chonky or not.</li>
          <li><strong>Natural Language Processing:</strong> Chatbots, language translators, AI-generated tweets that sound weirdly human.</li>
          <li><strong>Speech Recognition:</strong> Siri, Google Assistant, Alexa—basically, AI that sometimes understands you and sometimes makes up random responses.</li>
          <li><strong>Recommendation Systems:</strong> Netflix telling you what to watch next, YouTube suggesting random videos at 3 AM.</li>
          <li><strong>Fraud Detection in Finance:</strong> Banks stopping you from buying 27 pizzas at 2 AM because "that seems suspicious."</li>
        </ul>
        <p>Basically, if you’ve ever interacted with <strong>technology</strong>, you’ve probably used something powered by a <strong>neural network</strong>.</p>
      </section>
      
      <section>
        <h2 id="conclusion">Wrapping It Up: The Neural Network Journey</h2>
        <p>So, what have we <strong>learned</strong> today?</p>
        <ul>
          <li><strong>Neural networks</strong> are inspired by our <strong>brains</strong> (but they don’t overthink life decisions).</li>
          <li>They consist of <strong>neurons</strong>, <strong>layers</strong>, <strong>weights</strong>, <strong>biases</strong>, and <strong>activation functions</strong> working together.</li>
          <li>They learn from <strong>mistakes</strong> using <strong>forward propagation</strong>, <strong>loss functions</strong>, <strong>backpropagation</strong>, and <strong>gradient descent</strong>.</li>
          <li>And most importantly, they power some of the <strong>coolest tech</strong> we use daily.</li>
        </ul>
        <p>Of course, this is just <strong>scratching the surface</strong>. There’s a whole world of <strong>deep learning</strong>, <strong>convolutional neural networks</strong>, and <strong>insane AI models</strong> out there. But hey, if you made it this far, you already know <strong>more</strong> than most people do about neural networks!</p>
        <p>If you’re <strong>curious</strong> and want to go even <strong>deeper</strong>, I highly recommend checking out <a href="https://www.youtube.com/watch?v=aircAruvnKk&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi" target="_blank" rel="noopener noreferrer">3Blue1Brown’s Neural Networks Playlist</a>—his <strong>animations</strong> make even the trickiest <strong>concepts</strong> feel easy.</p>
      </section>
    </div>
  );
};

export default NeuralNetworksGuide;
