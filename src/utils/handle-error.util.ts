import { UnprocessableEntityException } from '@nestjs/common';

export function handleError(error: Error): undefined {
  const errorLines = error.message?.split('\n');
  const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
  if (!lastErrorLine) console.log(error);

  throw new UnprocessableEntityException(
    lastErrorLine || 'Algum erro ao executar a operacao',
  );
}
