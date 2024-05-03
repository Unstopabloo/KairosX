'use client';

import { DonutChart } from '@tremor/react';
import { QueryResultRow } from 'pg';

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

interface MainChartProps {
  dataIngresos: QueryResultRow[] | null | any;
  dataGastos: QueryResultRow[] | null | any;
}

export function MainChart({ dataIngresos, dataGastos }: MainChartProps) {
  return (
    <>
      <div className="mx-auto space-y-12">
        <div className="space-y-3">
          <div className="flex gap-16 justify-center">
            <div className='flex flex-col gap-10 items-center'>
              <span className="text-cente font-semibold text-tremor-default">
                Ingresos
              </span>
              <DonutChart
                data={dataIngresos}
                variant="donut"
                valueFormatter={valueFormatter}
                onValueChange={(v) => console.log(v)}
                className='w-52 h-52 p-2'
              />
            </div>
            <div className='flex flex-col gap-10 items-center'>
              <span className="text-cente font-semibold text-tremor-default">
                Gastos
              </span>
              <DonutChart
                data={dataGastos}
                variant="donut"
                valueFormatter={valueFormatter}
                onValueChange={(v) => console.log(v)}
                colors={['red', 'violet', 'orange', 'rose', 'cyan', 'orange', 'violet', 'cyan']}
                className='w-52 h-52 p-2'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}