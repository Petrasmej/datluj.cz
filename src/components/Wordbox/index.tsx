import React, { useState, useEffect } from 'react';
import './style.css';

interface WordboxProps {
  word: string;
  onFinish: () => void;
  active: boolean;
  onMistake: () => void;
}

const Wordbox: React.FC<WordboxProps> = ({
  word,
  onFinish,
  active,
  onMistake,
}) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  const [mistake, setMistake] = useState<boolean>(false);

  useEffect(() => {
    if (!active) return;

    const handleKeyUp = (event: KeyboardEvent) => {
      const { key } = event;
      console.log(`Stisknuta klávesa: ${key}`); // Debugging

      setLettersLeft((oldLettersLeft) => {
        if (oldLettersLeft.startsWith(key.toLowerCase())) {
          setMistake(false);
          const newLettersLeft = oldLettersLeft.slice(1);
          if (newLettersLeft.length === 0) {
            onFinish();
            return '';
          }
          return newLettersLeft;
        } else {
          setMistake(true);
          onMistake();
          return oldLettersLeft;
        }
      });
    };

    const handleKeyDown = () => {
      setMistake(false);
    };

    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [lettersLeft, onFinish, active, onMistake]);

  return (
    <div className={`wordbox ${mistake ? 'wordbox--mistake' : ''}`}>
      {lettersLeft}{' '}
    </div>
  );
};

export default Wordbox;
