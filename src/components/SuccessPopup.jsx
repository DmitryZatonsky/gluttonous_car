import { CheckCircle } from 'lucide-react';

export default function SuccessPopup({ isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="success-overlay">
      <div className="success-circle">
        <CheckCircle size={80} color="white" strokeWidth={1.5} />
        <span>Сохранено</span>
      </div>
    </div>
  );
}