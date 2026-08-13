import { HistoryCard } from '@/components/features/Simulation/History/HistoryCard';
import { PageHero } from '@/components/shared/PageHero';
import type { SimulationRecord } from '@/data/simulation';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function SimulationHistoryPage() {
  const { getAllSimulations, deleteSimulation } = useSimulationStorage();
  const [simulations, setSimulations] = useState<SimulationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSimulations = () => {
      const data = getAllSimulations();
      setSimulations(data);
      setIsLoading(false);
    };

    loadSimulations();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta simulação?')) {
      deleteSimulation(id);
      setSimulations((prev) => prev.filter((sim) => sim.id !== id));
    }
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <p className="text-center text-gray-500">Carregando simulações...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Acompanhe o histórico de seus planos financeiros."
      />

      {simulations.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 py-12">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-900">Nenhuma simulação encontrada</p>
            <p className="mt-1 text-gray-600">Crie sua primeira simulação para começar</p>
          </div>
          <Link
            to="/"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Criar nova simulação
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {simulations.map((simulation) => (
            <HistoryCard key={simulation.id} simulation={simulation} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </main>
  );
}
