import * as Dialog from '@radix-ui/react-dialog';
import { Ruler, X } from 'lucide-react';

interface SizeGuideDialogProps {
  fit: string;
}

const measurements = [
  { size: 'PP', bust: '78–84', waist: '60–66', hip: '86–92' },
  { size: 'P', bust: '84–90', waist: '66–72', hip: '92–98' },
  { size: 'M', bust: '90–98', waist: '72–80', hip: '98–106' },
  { size: 'G', bust: '98–106', waist: '80–88', hip: '106–114' },
  { size: 'GG', bust: '106–114', waist: '88–98', hip: '114–122' },
];

export function SizeGuideDialog({ fit }: SizeGuideDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="size-guide-trigger">
        <Ruler aria-hidden="true" /> Guia de medidas
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="size-guide-dialog">
          <div className="size-guide-dialog__header">
            <div>
              <p className="eyebrow">Encontre seu ajuste</p>
              <Dialog.Title>Guia de medidas</Dialog.Title>
            </div>
            <Dialog.Close className="icon-button" aria-label="Fechar guia de medidas">
              <X aria-hidden="true" />
            </Dialog.Close>
          </div>
          <Dialog.Description>{fit}</Dialog.Description>
          <div className="size-guide-dialog__table-wrap">
            <table>
              <caption className="sr-only">Medidas corporais em centímetros</caption>
              <thead>
                <tr>
                  <th>Tamanho</th>
                  <th>Tórax</th>
                  <th>Cintura</th>
                  <th>Quadril</th>
                </tr>
              </thead>
              <tbody>
                {measurements.map((row) => (
                  <tr key={row.size}>
                    <th>{row.size}</th>
                    <td>{row.bust}</td>
                    <td>{row.waist}</td>
                    <td>{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="size-guide-dialog__note">Medidas em centímetros. Use uma fita métrica sem apertar o corpo.</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
