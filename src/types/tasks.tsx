
 interface Actionable {
    isCompleted: boolean
  }
  
interface Item{
    id: number,
    label: string,
    link?: {
      text: string,
      url: string
    },
    tasks?: string[]
  }
  
type Task = Actionable & Item;

export type {Task, Item, Actionable};