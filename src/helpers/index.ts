export function isEmpty(value: unknown) {
  if (typeof value === "string") return value.trim().length === 0; // se é string e esta vazio
  if (Array.isArray(value)) return value.length === 0; //  se é array e esta vazio
  if (!value) return true; // se for não houver valor undefined ou null
  if (value === false || value === true) return true; // se for boleando e tiver valor
  if (typeof value === "object") return Object.keys(value).length === 0; // se for objeto e nao tiver campos
  return false;
}

interface FromatedDateToBRInterface {
  date: Date;
  time?: Date;
}

export function formatDateToBR(props: FromatedDateToBRInterface) {
  const { date, time } = props;
  const parsedDate = new Date(date);
  const parsedTime = time ? new Date(time) : undefined;

  let timeLimit = parsedDate;
  if (parsedTime) {
    timeLimit = new Date(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      parsedDate.getDate(),
      parsedTime.getHours(),
      parsedTime.getMinutes(),
    );
  }
  return timeLimit.toLocaleString("pt-BR");
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
