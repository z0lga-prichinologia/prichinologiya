# CauseMap

An interactive 3D/2D visualization platform for historical events and their causal relationships.

## Features

- **3D Event Cloud**: Interactive 3D visualization showing historical events as nodes
- **2D Connection View**: Detailed 2D view showing causal relationships between events
- **Category Filtering**: Filter events by categories (Politics, Economy, Military, etc.)
- **Time Period Filtering**: Filter events by historical periods
- **Search Functionality**: Search for specific events
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: Next.js 14, React 18
- **3D Visualization**: react-force-graph-3d, Three.js
- **2D Visualization**: react-force-graph-2d
- **Styling**: CSS-in-JS with custom utility classes
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/z0lga-prichinologia/prichinologiya.git
cd prichinologiya
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Project Structure

```
├── pages/           # Next.js pages
│   ├── graph.js     # Main graph visualization
│   ├── index.js     # Homepage
│   └── api/         # API routes
├── components/      # React components
├── data/           # Data files and categories
├── styles/         # Global CSS styles
└── public/         # Static assets
```

## Live Demo

Visit the live application: [prichinologiya.vercel.app](https://prichinologiya.vercel.app)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.