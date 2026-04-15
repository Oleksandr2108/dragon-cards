import { useGameStore } from "../../store/useGameStore";

const SoundButton = () => {
  const toggleSound = useGameStore((s) => s.toggleSound);
  const isPlayingSound = useGameStore((s) => s.isPlayingSound);

  const handleSoundToggle = () => {
    toggleSound();
  };
  return (
    <div className="flex gap-4">
      <button
        onClick={handleSoundToggle}
        className={`px-4 py-2 rounded font-medium transition-all active:scale-95 ${
          isPlayingSound
            ? "bg-amber-400 text-gray-900"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
      >
        {isPlayingSound ? "Sound: ON" : "Sound: OFF"}
      </button>
    </div>
  );
};

export default SoundButton;
