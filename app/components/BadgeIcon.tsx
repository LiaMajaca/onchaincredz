interface BadgeIconProps {
  className?: string;
}

export default function BadgeIcon({ className = "w-16 h-16" }: BadgeIconProps) {
  return (
    <div className={`${className} bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg`}>
      <svg 
        className="w-8 h-8 text-white" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </div>
  );
}
