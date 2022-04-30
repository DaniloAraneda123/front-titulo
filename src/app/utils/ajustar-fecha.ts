export function ajustarFechas(start: Date, end: Date, group: string) {

    if (group == 'mensual') {
        const endMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0);
        start.setDate(1)
        end.setDate(endMonth.getDate())
    }

    if (group == 'semanal') {
        while (start.getDay() != 1) { start.setDate(start.getDate() - 1) }
        while (end.getDay() != 0) { end.setDate(end.getDate() + 1) }
    }

    return { start, end }
}