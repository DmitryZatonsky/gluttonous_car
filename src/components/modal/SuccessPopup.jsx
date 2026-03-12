import { CheckCircle } from 'lucide-react';

export default function SuccessPopup({ isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-success-circle">
        <CheckCircle size={80} color="white" strokeWidth={1.5} />
      </div>
    </div>
  );
}