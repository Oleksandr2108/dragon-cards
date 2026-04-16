import { useGameStore } from "../../store/useGameStore";
import SoundOn from "../../assets/sound-on.svg";
import SoundOff from "../../assets/sound-off.svg";

const SoundButton = () => {
  const toggleSound = useGameStore((s) => s.toggleSound);
  const isPlayingSound = useGameStore((s) => s.isPlayingSound);

  const handleSoundToggle = () => {
    toggleSound();
  };
  return (
      <button
        onClick={handleSoundToggle}
        className={`w-10 h-10 rounded-lg bg-[#151a27] flex items-center justify-center cursor-pointer mb-5`}
      >
        {isPlayingSound ? (
          <img
            className="w-6 h-6"
            src={SoundOn}
            alt="Sound On"
          />
        ) : (
          <img
            className="w-6 h-6"
            src={SoundOff}
            alt="Sound Off"
          />
        )}
      </button>
  );
};

export default SoundButton;
