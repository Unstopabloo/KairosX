'use client';


import {
  AreaChart,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const data = [
  {
    date: 'Aug 01',
    'Ingresos': 2100.2,
    'Gastos': 4434.1,
  },
  {
    date: 'Aug 02',
    'Ingresos': 2943.0,
    'Gastos': 4954.1,
  },
  {
    date: 'Aug 03',
    'Ingresos': 4889.5,
    'Gastos': 6100.2,
  },
  {
    date: 'Aug 04',
    'Ingresos': 3909.8,
    'Gastos': 4909.7,
  },
  {
    date: 'Aug 05',
    'Ingresos': 5778.7,
    'Gastos': 7103.1,
  },
  {
    date: 'Aug 06',
    'Ingresos': 5900.9,
    'Gastos': 7534.3,
  },
  {
    date: 'Aug 07',
    'Ingresos': 4129.4,
    'Gastos': 7412.1,
  },
  {
    date: 'Aug 08',
    'Ingresos': 6021.2,
    'Gastos': 7834.4,
  },
  {
    date: 'Aug 09',
    'Ingresos': 6279.8,
    'Gastos': 8159.1,
  },
  {
    date: 'Aug 10',
    'Ingresos': 6224.5,
    'Gastos': 8260.6,
  },
  {
    date: 'Aug 11',
    'Ingresos': 6380.6,
    'Gastos': 8965.3,
  },
  {
    date: 'Aug 12',
    'Ingresos': 6414.4,
    'Gastos': 7989.3,
  },
  {
    date: 'Aug 13',
    'Ingresos': 6540.1,
    'Gastos': 7839.6,
  },
  {
    date: 'Aug 14',
    'Ingresos': 6634.4,
    'Gastos': 7343.8,
  },
  {
    date: 'Aug 15',
    'Ingresos': 7124.6,
    'Gastos': 6903.7,
  },
  {
    date: 'Aug 16',
    'Ingresos': 7934.5,
    'Gastos': 6273.6,
  },
  {
    date: 'Aug 17',
    'Ingresos': 10287.8,
    'Gastos': 5900.3,
  },
  {
    date: 'Aug 18',
    'Ingresos': 10323.2,
    'Gastos': 5732.1,
  },
  {
    date: 'Aug 19',
    'Ingresos': 10511.4,
    'Gastos': 5523.1,
  },
  {
    date: 'Aug 20',
    'Ingresos': 11043.9,
    'Gastos': 5422.3,
  },
  {
    date: 'Aug 21',
    'Ingresos': 6700.7,
    'Gastos': 5334.2,
  },
  {
    date: 'Aug 22',
    'Ingresos': 6900.8,
    'Gastos': 4943.4,
  },
  {
    date: 'Aug 23',
    'Ingresos': 7934.5,
    'Gastos': 4812.1,
  },
  {
    date: 'Aug 24',
    'Ingresos': 9021.0,
    'Gastos': 2729.1,
  },
  {
    date: 'Aug 25',
    'Ingresos': 9198.2,
    'Gastos': 2178.0,
  },
  {
    date: 'Aug 26',
    'Ingresos': 9557.1,
    'Gastos': 2158.3,
  },
  {
    date: 'Aug 27',
    'Ingresos': 9959.8,
    'Gastos': 2100.8,
  },
  {
    date: 'Aug 28',
    'Ingresos': 10034.6,
    'Gastos': 2934.4,
  },
  {
    date: 'Aug 29',
    'Ingresos': 10243.8,
    'Gastos': 3223.4,
  },
  {
    date: 'Aug 30',
    'Ingresos': 10078.5,
    'Gastos': 3779.1,
  },
  {
    date: 'Aug 31',
    'Ingresos': 11134.6,
    'Gastos': 4190.3,
  },
  {
    date: 'Sep 01',
    'Ingresos': 12347.2,
    'Gastos': 4839.1,
  },
  {
    date: 'Sep 02',
    'Ingresos': 12593.8,
    'Gastos': 5153.3,
  },
  {
    date: 'Sep 03',
    'Ingresos': 12043.4,
    'Gastos': 5234.8,
  },
  {
    date: 'Sep 04',
    'Ingresos': 12144.9,
    'Gastos': 5478.4,
  },
  {
    date: 'Sep 05',
    'Ingresos': 12489.5,
    'Gastos': 5741.1,
  },
  {
    date: 'Sep 06',
    'Ingresos': 12748.7,
    'Gastos': 6743.9,
  },
  {
    date: 'Sep 07',
    'Ingresos': 12933.2,
    'Gastos': 7832.8,
  },
  {
    date: 'Sep 08',
    'Ingresos': 13028.8,
    'Gastos': 8943.2,
  },
  {
    date: 'Sep 09',
    'Ingresos': 13412.4,
    'Gastos': 9932.2,
  },
  {
    date: 'Sep 10',
    'Ingresos': 13649.0,
    'Gastos': 10139.2,
  },
  {
    date: 'Sep 11',
    'Ingresos': 13748.5,
    'Gastos': 10441.2,
  },
  {
    date: 'Sep 12',
    'Ingresos': 13148.1,
    'Gastos': 10933.8,
  },
  {
    date: 'Sep 13',
    'Ingresos': 12839.6,
    'Gastos': 11073.4,
  },
  {
    date: 'Sep 14',
    'Ingresos': 12428.2,
    'Gastos': 11128.3,
  },
  {
    date: 'Sep 15',
    'Ingresos': 12012.8,
    'Gastos': 11412.3,
  },
  {
    date: 'Sep 16',
    'Ingresos': 11801.3,
    'Gastos': 10501.1,
  },
  {
    date: 'Sep 17',
    'Ingresos': 10102.9,
    'Gastos': 8923.3,
  },
  {
    date: 'Sep 18',
    'Ingresos': 12132.5,
    'Gastos': 10212.1,
  },
  {
    date: 'Sep 19',
    'Ingresos': 12901.1,
    'Gastos': 10101.7,
  },
  {
    date: 'Sep 20',
    'Ingresos': 13132.6,
    'Gastos': 12132.3,
  },
  {
    date: 'Sep 21',
    'Ingresos': 14132.2,
    'Gastos': 13212.5,
  },
  {
    date: 'Sep 22',
    'Ingresos': 14245.8,
    'Gastos': 12163.4,
  },
  {
    date: 'Sep 23',
    'Ingresos': 14328.3,
    'Gastos': 10036.1,
  },
  {
    date: 'Sep 24',
    'Ingresos': 14949.9,
    'Gastos': 8985.1,
  },
  {
    date: 'Sep 25',
    'Ingresos': 15967.5,
    'Gastos': 9700.1,
  },
  {
    date: 'Sep 26',
    'Ingresos': 17349.3,
    'Gastos': 10943.4,
  },
  {
    date: 'Sep 27',
    'Ingresos': 37349.3,
    'Gastos': 20943.4,
  },
];

const summary = [
  {
    name: 'Ingresos',
    value: '$21,349.36',
    invested: '$19,698.65',
    cashflow: '$14,033.74',
    gain: '+$11,012.39',
    realized: '+$177.48',
    dividends: '+$490.97',
    bgColor: 'bg-blue-500',
    changeType: 'positive',
  },
  {
    name: 'Gastos',
    value: '$25,943.43',
    invested: '$23,698.65',
    cashflow: '$11,033.74',
    gain: '+$3,012.39',
    realized: '+$565.41',
    dividends: '+$290.97',
    bgColor: 'bg-violet-500',
    changeType: 'positive',
  },
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export function MainChart() {
  return (
    <>
      <h3 className="font-bold text-lg text-white">
        Resumen de Finanzas
      </h3>
      <p className="mt-1 font-semibold text-dark-tremor-content-strong">
        $32,227.40
      </p>
      <p className="mt-1 text-tremor-default font-medium">
        <span className="text-emerald-500">
          +$430.90 (4.1%)
        </span>{' '}
        <span className="font-normal text-gray-400">
          Ultimo mes
        </span>
      </p>
      <AreaChart
        data={data}
        index="date"
        categories={[
          'Ingresos',
          'Gastos',
        ]}
        colors={['green', 'orange-300']}
        valueFormatter={valueFormatter}
        yAxisWidth={55}
        onValueChange={() => { }}
        className="mt-6 hidden h-48 sm:block"
      />
      <AreaChart
        data={data}
        index="date"
        categories={[
          'Ingresos',
          'Gastos',
        ]}
        colors={['blue', 'orange-300']}
        valueFormatter={valueFormatter}
        showYAxis={false}
        showLegend={false}
        startEndOnly={true}
        className="mt-6 h-36 sm:hidden text-white"
      />
      <Table className="mt-8">
        <TableHead>
          <TableRow className="border-b border-dark-tremor-border">
            <TableHeaderCell className="text-dark-tremor-content-strong">
              Tipo
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-dark-tremor-content-strong">
              Valor
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-dark-tremor-content-strong">
              Activos
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-dark-tremor-content-strong">
              Pasivos
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-dark-tremor-content-strong">
              Este mes
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-dark-tremor-content-strong">
              Total
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summary.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="font-medium text-tremor-content-strong">
                <div className="flex space-x-3">
                  <span
                    className={classNames(item.bgColor, 'w-1 shrink-0 rounded')}
                    aria-hidden={true}
                  />
                  <span>{item.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">{item.value}</TableCell>
              <TableCell className="text-right">{item.invested}</TableCell>
              <TableCell className="text-right">{item.cashflow}</TableCell>
              <TableCell className="text-right">
                <span
                  className={classNames(
                    item.changeType > "800000"
                      ? 'text-emerald-500'
                      : 'text-red-500',
                  )}
                >
                  {item.gain}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={classNames(
                    item.changeType === 'positive'
                      ? 'text-emerald-500'
                      : 'text-red-500',
                  )}
                >
                  {item.realized}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}