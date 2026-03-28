import { FiCheck, FiPackage, FiTruck, FiHome, FiX } from 'react-icons/fi';

const STATUS_STEPS = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];

const STATUS_COLORS = {
  'Order Placed':    'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Preparing':       'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Out for Delivery':'bg-brand-500/20 text-brand-400 border-brand-500/30',
  'Delivered':       'bg-green-500/20 text-green-400 border-green-500/30',
  'Cancelled':       'bg-red-500/20 text-red-400 border-red-500/30',
};

export function OrderStatusBadge({ status }) {
  return (
    <span className={`badge border text-xs font-bold ${STATUS_COLORS[status] || STATUS_COLORS['Order Placed']}`}>
      {status}
    </span>
  );
}

export function OrderStepper({ status }) {
  if (status === 'Cancelled') {
    return (
      <div className="flex items-center gap-2 text-red-400 text-sm">
        <FiX className="w-5 h-5" /> Order Cancelled
      </div>
    );
  }

  const currentIndex = STATUS_STEPS.indexOf(status);
  const icons = [FiPackage, FiPackage, FiTruck, FiHome];

  return (
    <div className="flex items-center gap-0 w-full">
      {STATUS_STEPS.map((step, i) => {
        const done    = i < currentIndex;
        const active  = i === currentIndex;
        const Icon    = icons[i];

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                done   ? 'bg-green-500 border-green-500 text-white' :
                active ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/30' :
                         'bg-dark-700 border-white/10 text-gray-600'
              }`}>
                {done ? <FiCheck className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span className={`text-[10px] font-semibold whitespace-nowrap ${
                done ? 'text-green-400' : active ? 'text-brand-400' : 'text-gray-600'
              }`}>{step}</span>
            </div>

            {i < STATUS_STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 -mt-5 transition-all ${done ? 'bg-green-500' : 'bg-white/10'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
