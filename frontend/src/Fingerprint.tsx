import { getFingerprint } from '@thumbmarkjs/thumbmarkjs';
import { useEffect, useState } from 'react';

export const Fingerprint = () => {
  const [Fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    getFingerprint().then(setFingerprint);
  });

  return (
    <div>
      <p>{Fingerprint}</p>
    </div>
  );
};

export default Fingerprint;
