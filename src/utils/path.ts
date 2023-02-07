import path from 'path'
import { getEnv } from './env'

export function getPath(fileName: string) {
  const base = getEnv('base') as string
  return path.resolve(base, fileName)
}