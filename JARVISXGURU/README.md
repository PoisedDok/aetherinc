# GURU Conversational AI - Modular Architecture

## 🤖 Overview

GURU (Global Universal Research Unit) is an advanced conversational AI system with modular architecture, designed for truly natural conversation experiences. This version breaks down the monolithic HTML file into manageable, optimized components for better performance, easier debugging, and simplified feature additions.

## 🏗️ Architecture

### Core Structure
```
JARVISXGURU/
├── index.html              # Main entry point
├── jarvis-final.html       # Original monolithic version
├── guru-search-engine.js   # Advanced search engine
├── styles/                 # CSS modules
│   ├── main.css           # Core styling
│   ├── hud.css            # HUD interface styles
│   ├── settings.css       # Settings panel styles
│   └── visualizer.css     # Neural visualizer styles
└── modules/               # JavaScript modules
    ├── guru-core.js       # Core AI system
    ├── audio-processor.js # Audio analysis & visualization
    ├── voice-activity-detection.js # Advanced VAD
    ├── conversation-manager.js     # Conversation logic
    ├── speech-synthesis.js        # TTS systems
    ├── neural-visualizer.js       # 3D visualization
    ├── ai-providers.js           # AI provider management
    └── settings-manager.js       # Settings & configuration
```

## 🎯 Key Features

### Conversational AI Capabilities
- **Advanced Voice Activity Detection (VAD)** - ML-based speech detection
- **Natural Turn-Taking** - Transition-relevant point detection
- **Real-time Streaming** - Low-latency audio processing (<600ms)
- **Context-Aware Responses** - Conversation memory and context
- **Interrupt Handling** - Graceful conversation interruptions
- **Multi-Provider Support** - Ollama, Gemini 2.0/2.5 Flash

### Audio Processing
- **Enhanced Audio Analysis** - Spectral analysis, noise detection
- **Adaptive Thresholds** - Dynamic speech/silence detection
- **Real-time Visualization** - Frequency spectrum display
- **Quality Assessment** - Audio quality monitoring

### User Interface
- **HUD Overlay System** - Futuristic heads-up display
- **Neural Network Visualization** - Interactive 3D neural network
- **Real-time Status** - System health monitoring
- **Responsive Design** - Mobile and desktop optimized

## 🚀 Quick Start

1. **Open the main interface:**
   ```bash
   # Open index.html in your browser
   open index.html
   ```

2. **Configure API Keys:**
   - Press `Ctrl+Alt+S` for settings
   - Add your Gemini API key
   - Configure ElevenLabs API (optional)

3. **Start Conversing:**
   - Grant microphone permissions
   - Just start talking naturally
   - The system detects speech automatically

## 🎛️ Configuration

### Conversational Mode Settings
```javascript
conversationalMode: {
    enabled: true,                    // Enable natural conversation
    silenceThreshold: -45,           // dB threshold for silence
    speechThreshold: -30,            // dB threshold for speech
    minimumSpeechDuration: 500,      // ms minimum speech duration
    endOfSpeechPause: 1200,         // ms pause before processing
    turnTakingDelay: 800,           // ms delay for turn-taking
    adaptiveThresholds: true         // Enable adaptive noise adjustment
}
```

### AI Provider Configuration
```javascript
providers: {
    'gemini-2.0-flash': {
        name: 'Gemini 2.0 Flash',
        model: 'gemini-2.0-flash-exp',
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent'
    },
    ollama: {
        name: 'Local Ollama',
        url: 'http://localhost:11434',
        model: 'llama3.2'
    }
}
```

## 🧩 Module Details

### Core Module (`guru-core.js`)
- Main application controller
- System initialization
- Event handling
- Provider management
- Conversation state management

### Audio Processor (`audio-processor.js`)
- Real-time audio analysis
- Frequency spectrum visualization
- Voice activity detection
- Audio quality assessment
- Performance monitoring

### Conversation Manager (`conversation-manager.js`)
- Natural language processing
- Context maintenance
- Response generation
- Turn-taking logic
- Memory management

### Speech Synthesis (`speech-synthesis.js`)
- Multi-provider TTS support
- ElevenLabs integration
- Edge TTS fallback
- Native browser TTS
- Voice quality optimization

### Neural Visualizer (`neural-visualizer.js`)
- 3D neural network rendering
- Interactive camera controls
- Real-time activity visualization
- Performance optimization
- Touch/mouse interaction

## 🎨 Styling System

### CSS Architecture
- **Modular CSS** - Separated by functionality
- **Responsive Design** - Mobile-first approach
- **Accessibility** - High contrast and reduced motion support
- **Performance** - GPU acceleration and optimizations

### Color Scheme
- **Primary**: `#00d4ff` (Cyan)
- **Secondary**: `#ff6b00` (Orange)
- **Accent**: `#00ff41` (Green)
- **Warning**: `#ff0040` (Red)
- **Background**: `#000000` (Black)

## 🔧 Development

### Adding New Modules
1. Create new `.js` file in `modules/` directory
2. Follow the modular pattern:
   ```javascript
   class GuruNewModule {
       constructor() {
           // Module initialization
       }
       
       init() {
           // Setup logic
       }
   }
   
   // Extend main class
   if (typeof window !== 'undefined' && window.GuruConversationalAI) {
       window.GuruConversationalAI.prototype.newModuleMethod = function() {
           // Integration with core system
       };
   }
   ```

3. Add script tag to `index.html`:
   ```html
   <script src="modules/new-module.js"></script>
   ```

### Performance Optimization
- **Lazy Loading** - Modules load as needed
- **Event Delegation** - Efficient event handling
- **RAF Optimization** - Smooth animations
- **Memory Management** - Proper cleanup
- **WebAssembly Ready** - For future ML models

## 🐛 Debugging

### Debug Information
Access debug info via browser console:
```javascript
// Core system debug
console.log(window.guru.getAudioDebugInfo());

// Conversation debug
console.log(window.guru.conversationHistory);

// Provider status
console.log(window.guru.providers);
```

### Common Issues
1. **Microphone not working** - Check browser permissions
2. **API connection failed** - Verify API keys in settings
3. **Speech not detected** - Adjust threshold in settings
4. **Poor audio quality** - Check microphone and noise levels

## 🔒 Security & Privacy

### Data Protection
- **Local Storage** - Conversations stored locally only
- **API Security** - Keys stored in localStorage (user's device)
- **No Server** - All processing client-side
- **Privacy First** - No data transmission unless explicitly requested

### Best Practices
- Regularly clear conversation history
- Use strong API keys
- Keep browser updated
- Review permissions regularly

## 📱 Browser Compatibility

### Supported Browsers
- **Chrome/Chromium** - Full support (recommended)
- **Firefox** - Full support
- **Safari** - Limited (no WebRTC audio worklets)
- **Edge** - Full support

### Required Features
- Web Audio API
- Speech Recognition API
- ES6+ JavaScript
- WebGL (for visualizations)
- Local Storage

## 🔮 Future Enhancements

### Planned Features
- **WebRTC Integration** - Real-time streaming
- **Silero VAD** - Professional-grade voice detection
- **Streaming STT/TTS** - Sub-second response times
- **Advanced NLP** - Better context understanding
- **Multi-language Support** - International conversations
- **Voice Cloning** - Custom voice synthesis

### Research Areas
- **Crosstalk Detection** - Advanced interruption handling
- **Emotion Recognition** - Emotional context awareness
- **Real-time Translation** - Multi-language conversations
- **WebAssembly ML** - Client-side machine learning

## 📄 License

This project is part of the AetherInc ecosystem. See main project license for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Follow modular architecture patterns
4. Add comprehensive documentation
5. Test across supported browsers
6. Submit pull request

---

**Ready to experience truly conversational AI? Open `index.html` and start talking!** 🚀 