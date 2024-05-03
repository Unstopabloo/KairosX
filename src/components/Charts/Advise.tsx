'use client'

import { useCompletion } from 'ai/react';
import H2Card from '../H2Card';
import { Button } from '@/components/ui/button';
import { QueryResultRow } from '@vercel/postgres';
import { useState } from 'react';

interface AdviseProps {
  ingresos: QueryResultRow[] | null | any;
  gastos: QueryResultRow[] | null | any;
}

export const dynamic = 'force-dynamic'

export default function Advise({ ingresos, gastos }: AdviseProps) {
  const [disabled, setDisabled] = useState<boolean>(true)

  const rawData = `Ingresos: ${JSON.stringify(ingresos)}, Gastos: ${JSON.stringify(gastos)}`

  const { completion, handleSubmit } = useCompletion({
    api: '/api/completion',
    initialInput: rawData,
  })

  const handleSubmitWithDelay = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(false);

    setTimeout(() => {
      setDisabled(true);
    }, 30000);

    await handleSubmit(event);
  };


  return (
    <section className='flex flex-col gap-6'>
      <header className='flex items-center justify-between'>
        <H2Card text="Consejo de Kairos" />
        <form onSubmit={handleSubmitWithDelay}>
          <Button
            className={disabled === true ? '' : 'cursor-not-allowed opacity-50'}
            disabled={!disabled}
            size="sm"
            type="submit"
          >
            Obtener consejo
          </Button>
        </form>
      </header>
      <p className='p-6 text-white/80 w-full max-w-[700px] h-72 overflow-y-auto'>{completion}</p>
    </section>
  )
}