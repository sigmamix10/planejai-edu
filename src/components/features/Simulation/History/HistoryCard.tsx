import { Button } from '@/components/shared/Button';
import type { SimulationRecord } from '@/data/simulation';
import { calcMonthlySavings } from '@/utils/simulation';
import { Clock, DollarSign, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HistoryCardProps {
  simulation: SimulationRecord;
  onDelete: (id: string) => void;
}

export function HistoryCard({ simulation, onDelete }: HistoryCardProps) {
  const monthlySavings = calcMonthlySavings(simulation);

  // Format date from ISO string or fallback to current date
  const createdDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-center md:justify-between md:gap-6">
      <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center md:gap-8">
        {/* Icon and Info */}
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center rounded-lg bg-linear-to-br from-purple-100 to-purple-50 p-3">
            <svg className="h-6 w-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{simulation.goalName}</h3>
            <p className="text-sm text-gray-500">{createdDate}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid flex-1 grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {/* Goal Amount */}
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Custo da Meta</p>
            <p className="text-base font-semibold text-gray-900">{simulation.goalAmount}</p>
          </div>

          {/* Deadline */}
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Prazo</p>
            <p className="flex items-center gap-1 text-base font-semibold text-gray-900">
              <Clock className="h-4 w-4" />
              {simulation.goalDeadline} meses
            </p>
          </div>

          {/* Monthly Savings */}
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Economia Mensal</p>
            <p className="flex items-center gap-1 text-base font-semibold text-emerald-600">
              <DollarSign className="h-4 w-4" />
              R${' '}
              {monthlySavings.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 md:flex-row md:gap-3">
        <Link to={`/resultado/${simulation.id}`} className="flex-1 md:flex-none">
          <Button variant="secondary" className="w-full">
            Ver detalhes
          </Button>
        </Link>
        <button
          onClick={() => onDelete(simulation.id)}
          className="flex items-center justify-center gap-2 rounded-lg bg-red-50 p-3 text-red-600 transition-colors hover:bg-red-100 md:p-2"
          title="Deletar simulação"
        >
          <Trash2 className="h-4 w-4" />
          <span className="md:hidden">Deletar</span>
        </button>
      </div>
    </div>
  );
}
