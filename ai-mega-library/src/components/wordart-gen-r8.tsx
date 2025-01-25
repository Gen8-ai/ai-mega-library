const WordArtText = () => {
  return (
    <div className="flex justify-center items-center h-96 bg-gray-100">
      <div className="relative">
        {/* Drop shadow layer */}
        <h1 
          className="text-8xl font-black tracking-tight select-none absolute"
          style={{
            WebkitTextStroke: '1.5px rgba(79, 70, 229, 0.2)',
            WebkitTextFillColor: 'transparent',
            transform: 'translate(3px, 3px)',
          }}
        >
          Gen R8
        </h1>
        
        {/* Main text layer */}
        <h1 
          className="text-8xl font-black tracking-tight select-none relative"
        >
          <span className="relative" style={{
            WebkitTextStroke: '1.5px #4f46e5',
            WebkitTextFillColor: 'transparent',
            filter: `
              drop-shadow(0 0 1px rgba(79, 70, 229, 0.3))
            `,
            textShadow: `
              inset 0 0 1px rgba(79, 70, 229, 0.2),
              inset 0 0 2px rgba(79, 70, 229, 0.2)
            `,
          }}>
            <span className="absolute inset-0" style={{
              WebkitTextStroke: '0',
              WebkitTextFillColor: 'transparent',
              background: 'linear-gradient(45deg, rgba(79, 70, 229, 0.1), rgba(79, 70, 229, 0.05))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              filter: 'blur(1px)',
            }}>
              Gen R8
            </span>
            Gen R8
          </span>
        </h1>
      </div>
    </div>
  );
};

export default WordArtText;