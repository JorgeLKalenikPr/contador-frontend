class UtilsDate {
  private readonly formatter: Intl.DateTimeFormat
  constructor(
    formatter: Intl.DateTimeFormat =  new Intl.DateTimeFormat('pt-BR')
  ){
    this.formatter = formatter
   }

  formatToDefault(date: string){
    const dateToFormat = new Date(date)
    const fomatedDate = this.formatter.format(dateToFormat);

    return fomatedDate;
  }
}

export const utilsDate = new UtilsDate();