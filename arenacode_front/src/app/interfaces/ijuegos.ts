import { ICategoria } from "./icategoria"

export interface IJuego {
  id: number
  nombre: string        
  descripcion: string
  imagen_url: string   
  categoria_id: number  
}