import React from 'react';
import CodeBlock from '../../components/CodeBlock/CodeBlock';

const QuantTradingBacktesting = () => {
  return (
    <>
      <p>
        I've always been fascinated by the idea of building strategies, implementing them on computers, testing them and then seeing if they can actually make us some money in the real market!!! And thus, I decided to build and understand the core of quant… Let's dive right into it!!
      </p>

      <h2>How It Works</h2>
      <p>So first let us understand how it works -</p>
      <ul>
        <li>Select a stock you are interested in</li>
        <li>Understand the stock structure, trends and prices &gt; Take a good amount of datasets for testing and understanding patterns</li>
        <li>Develop a strategy that you feel might work and give you profits</li>
        <li>Backtest it - Backtesting basically means, "simulating your strategy virtually on past market to see if it could work!"</li>
        <li>Optimise the strategy for better returns</li>
      </ul>

      <p>
        As for this blog you can refer to this repository - <a href="https://github.com/imrishi007/Backtest1" target="_blank" rel="noopener noreferrer">https://github.com/imrishi007/Backtest1</a>
      </p>

      <p>
        We will be using the stock prices of AAPL stock for five years between 2018-23.
      </p>

      <h2>Data Loading</h2>
      <p>In order to import our data we use data_loader.py in src folder:</p>

      <CodeBlock
        language="python"
        filename="data_loader.py"
        code={`import os
import yfinance as yf
import pandas as pd

class DataLoader:
    def __init__(self, data_dir='data'):
        self.data_dir = data_dir
        if not os.path.exists(data_dir):
            os.makedirs(data_dir)

    def get_data(self, symbol, start_date=None, end_date=None, start=None, end=None):
        start_date = start_date or start
        end_date = end_date or end

        file_path = os.path.join(self.data_dir, f"{symbol}.csv")

        if os.path.exists(file_path):
            print(f"Loading data for {symbol} from local cache...")
            df = pd.read_csv(file_path, index_col=0, parse_dates=True)

            if start_date and end_date:
                df = df.loc[start_date:end_date]
                if df.empty:
                    print(f"Warning: No data in cache for range {start_date} to {end_date}")
                    print(f"Attempting to download from Yahoo Finance...")
                    return self._download_data(symbol, start_date, end_date, file_path)

            return df

        return self._download_data(symbol, start_date, end_date, file_path)

    def _download_data(self, symbol, start_date, end_date, file_path):
        print(f"Downloading data for {symbol} from Yahoo Finance...")
        try:
            df = yf.download(symbol, start=start_date, end=end_date, progress=False)

            if df.empty:
                print(f"Warning: No data found for {symbol}.")
                return None

            df.to_csv(file_path)
            print(f"Data saved to {file_path}")
            return df

        except Exception as e:
            print(f"Error downloading data: {e}")
            return None`}
      />

      <h2>Understanding Strategies</h2>
      <p>
        Let us understand the core of this project now: "STRATEGIES"!!
      </p>
      <p>
        We used two strategies in this and we will understand both of them in detail.
      </p>

      <h3>SMA (Simple Moving Average)</h3>
      <p>
        This is one of the most basic strategies used in finance. We use two lines for this:
      </p>
      <ul>
        <li><strong>Fast Line/short window:</strong> This is the average price of past 50 days and it reacts quickly to recent price changes.</li>
        <li><strong>Slow Line/long window:</strong> This is the average price of stock in past 200 days and it represents the long term trend.</li>
      </ul>

      <p>
        We use these two indicators to signal our mode to BUY or SELL. How exactly? Just two simple rules:
      </p>
      <ul>
        <li>Buy when the FAST LINE crosses SLOW LINE i.e., FAST LINE &gt; SLOW LINE. Simple logic is, the latest trend is going above the average trend in the past, maybe the stock prices would rise!!</li>
        <li>Sell when the opposite happens!!</li>
      </ul>

      <CodeBlock
        language="python"
        filename="sma_strategy.py"
        code={`class SMAStrategy:
    def __init__(self, short_window=50, long_window=200):
        self.short_window = short_window
        self.long_window = long_window

    def generate_signals(self, data):
        signals = data.copy()

        signals['short_mavg'] = signals['Close'].rolling(
            window=self.short_window, min_periods=1).mean()
        signals['long_mavg'] = signals['Close'].rolling(
            window=self.long_window, min_periods=1).mean()

        signals['signal'] = np.where(
            signals['short_mavg'] > signals['long_mavg'], 1.0, 0.0
        )
        signals['positions'] = signals['signal'].diff()

        return signals`}
      />

      <img 
        src="/blog_images/sma_price_signals.png" 
        alt="AAPL Price with 50-Day and 200-Day Simple Moving Averages and Buy/Sell Markers" 
        style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '2rem auto' }} 
      />
      <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginTop: '-1rem' }}>
        AAPL Price with 50-Day and 200-Day Simple Moving Averages and Buy/Sell Markers
      </p>

      <img 
        src="/blog_images/sma_equity.png" 
        alt="SMA Equity Curve (50/200)" 
        style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '2rem auto' }} 
      />
      <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginTop: '-1rem' }}>
        SMA Equity Curve (50/200)
      </p>

      <h3>RSI (Relative Strength Index)</h3>
      <p>
        The core concept of RSI is based on a rubber band. The more you stretch it, it fires in the opposite direction. All you do is average up the gain of the past 14 days and divide it by the loss over the same period.
      </p>

      <p style={{ textAlign: 'center', fontSize: '1.2rem', margin: '1.5rem 0' }}>
        RSI = AVERAGE GAIN / AVERAGE LOSS
      </p>

      <p>How can we understand it? Simple:</p>
      <ul>
        <li><strong>Overbought (70-100):</strong> The buyers are exhausted at this point and the price has risen too fast too soon, i.e., it is expensive relative to the recent history. Thus we should rather sell the stock in this range.</li>
        <li><strong>Oversold (0-30):</strong> Sellers are exhausted, panic selling has pushed the price down too far and thus it is cheap. Therefore we should buy stock if RSI is in this range.</li>
        <li><strong>Neutral (30-70):</strong> This is a normal zone and the market is behaving normally. RSI traders just sit and watch their screens peacefully at this point lol XD</li>
      </ul>

      <CodeBlock
        language="python"
        filename="rsi_strategy.py"
        code={`class RSIStrategy:
    def __init__(self, period=14, buy_threshold=30, sell_threshold=70):
        self.period = period
        self.buy_threshold = buy_threshold
        self.sell_threshold = sell_threshold

    def calculate_rsi(self, data):
        delta = data['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=self.period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=self.period).mean()
        rs = gain / loss.replace(0, np.nan)
        return 100 - (100 / (1 + rs))

    def generate_signals(self, data):
        signals = data.copy()
        signals['rsi'] = self.calculate_rsi(signals)

        signals['long_entry'] = signals['rsi'] < self.buy_threshold
        signals['long_exit'] = signals['rsi'] > self.sell_threshold

        position = 0
        history = []
        for i in range(len(signals)):
            if signals['long_entry'].iloc[i]:
                position = 1
            elif signals['long_exit'].iloc[i]:
                position = 0
            history.append(position)

        signals['signal'] = history
        signals['positions'] = signals['signal'].diff()

        return signals`}
      />

      <img 
        src="/blog_images/rsi_plot.png" 
        alt="RSI values with Overbought (70) and Oversold (30) thresholds" 
        style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '2rem auto' }} 
      />
      <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginTop: '-1rem' }}>
        RSI values with Overbought (70) and Oversold (30) thresholds
      </p>

      <img 
        src="/blog_images/rsi_equity.png" 
        alt="RSI Equity Curve (14,30/70)" 
        style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '2rem auto' }} 
      />
      <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginTop: '-1rem' }}>
        RSI Equity Curve (14,30/70)
      </p>

      <h3>Combining SMA and RSI</h3>
      <p>
        Okay so now this is where things get a little more interesting…
      </p>
      <p>
        I thought, why not take the best of both worlds?
      </p>
      <p>
        SMA helps us follow the big trend and RSI helps us catch smart entries during temporary dips…
      </p>
      <p>
        So together we only buy when the trend is UP AND the price is temporarily DOWN!
      </p>

      <p>Basically:</p>
      <ul>
        <li>Trend says: "Yes bro, we are moving UP!"</li>
        <li>RSI says: "Stock is at a discount right now!"</li>
        <li>And we go: "Let's BUY!"</li>
      </ul>

      <p>So here are the simple rules I used:</p>
      <ul>
        <li>Trend filter: short_mavg &gt; long_mavg</li>
        <li>Buy dip: RSI &lt; rsi_buy (30 by default)</li>
        <li>Exit when trend breaks or RSI is too high: RSI &gt; rsi_sell (70 by default)</li>
      </ul>

      <CodeBlock
        language="python"
        filename="sma_rsi_strategy.py"
        code={`class SMARSIStrategy:
    def __init__(self, short_window=50, long_window=200, rsi_period=14, rsi_buy=30, rsi_sell=70):
        self.short_window = short_window
        self.long_window = long_window
        self.rsi_period = rsi_period
        self.rsi_buy = rsi_buy
        self.rsi_sell = rsi_sell

    def calculate_rsi(self, data):
        delta = data['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=self.rsi_period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=self.rsi_period).mean()
        rs = gain / loss.replace(0, np.nan)
        return 100 - (100 / (1 + rs))

    def generate_signals(self, data):
        signals = data.copy()

        signals['short_mavg'] = signals['Close'].rolling(window=self.short_window, min_periods=1).mean()
        signals['long_mavg'] = signals['Close'].rolling(window=self.long_window, min_periods=1).mean()
        signals['rsi'] = self.calculate_rsi(signals)

        signals['trend_up'] = signals['short_mavg'] > signals['long_mavg']
        signals['oversold'] = signals['rsi'] < self.rsi_buy
        signals['overbought'] = signals['rsi'] > self.rsi_sell

        signals['long_entry'] = signals['trend_up'] & signals['oversold']
        signals['long_exit'] = (~signals['trend_up']) | signals['overbought']

        position = 0
        history = []

        for i in range(len(signals)):
            if signals['long_entry'].iloc[i]:
                position = 1
            elif signals['long_exit'].iloc[i]:
                position = 0
            history.append(position)

        signals['signal'] = history
        signals['positions'] = signals['signal'].diff()

        return signals`}
      />

      <img 
        src="/blog_images/combo_equity.png" 
        alt="SMA + RSI Combined Strategy Equity Curve" 
        style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '2rem auto' }} 
      />
      <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginTop: '-1rem' }}>
        SMA + RSI Combined Strategy Equity Curve
      </p>

      <h2>Results and Analysis</h2>
      <p>
        Alright now, let us see the results. RSI killed it here. But yeah it wasn't the default one which made us the most amount of profit. We optimised it and the RSI which got us maximum had the following config: buy when less than 30, sell when more than 80. So none of the base models performed best but the one with optimisation came out to be the best one of all!!!
      </p>

      <img 
        src="/blog_images/final_table.png" 
        alt="Performance comparison of all strategies" 
        style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '2rem auto' }} 
      />

      <div className="info-box">
        <div className="info-box-title">What is Sharpe Ratio?</div>
        <p>
          Just for people who don't know what Sharpe ratio is, here's a short explanation. It is the measure of an investment's risk adjusted return. It basically tells us how much excess return an investment generates for each unit of risk taken. In simple terms, it just asks "is the risk even worth the return?" Higher the Sharpe ratio, better it is for the investor.
        </p>
      </div>

      <h2>Why RSI Performed Best</h2>
      <p>
        As far as the performance of our model is concerned, a simple reason why RSI performed the best was AAPL stock which we took was in a strong uptrend for most of the time we studied the stock, with small dips along the way, and our configuration of RSI catches those easily. We can say it is built for this situation lol. Default RSI reacted to too many trends and entered when dips weren't even that strong while SMA was too basic and slow to react even though it gave us a profit.
      </p>

      <h2>Reality Check</h2>
      <p>
        And for people thinking "Ohh it's so easy to make profits all you have to do is put in some predefined strategies into play and baammmm you'll be a billionaire!!" "Absolutely not!!!" This was just a basic demonstration using a very simple model to understand how backtesting works and how we can implement a strategy to see if we can actually work it out to make money in market. This isn't for real world scenarios. And the profits aren't real either, I haven't included the taxes and multiple costs like slippage, liquidity issues, short selling margin and what not.
      </p>

      <h2>Conclusion</h2>
      <p>
        I hope you understood the basic idea behind this blog and how one can implement a strategy and backtest it in the simplest way possible. I might have been wrong in multiple places but it is just the beginning for me and I look forward to many new learnings in future. Will try to make better projects with complex concepts in future.
      </p>

      <p style={{ fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center', marginTop: '2rem' }}>
        THANKS FOR READING!!
      </p>
    </>
  );
};

export default QuantTradingBacktesting;
