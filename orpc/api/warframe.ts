import { z } from 'zod'
import { oc } from '@orpc/contract'
import { ORPCError } from '@orpc/server'

export const WarframeSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
  type: z.enum(['Warframe', 'Weapon', 'Companion', 'Other']),
  masteryRank: z.number().int().min(0).max(30).optional()
})

type Warframe = z.infer<typeof WarframeSchema>

export const ListWarframeInputSchema = z.object({
  limit: z.number().int().min(1).max(100).optional(),
  cursor: z.number().int().min(0).default(0),
  type: WarframeSchema.shape.type.optional()
})

export const FindWarframeInputSchema = WarframeSchema.pick({ id: true })

export const CreateWarframeInputSchema = WarframeSchema.omit({ id: true })

type ListWarframeInput = z.infer<typeof ListWarframeInputSchema>
type FindWarframeInput = z.infer<typeof FindWarframeInputSchema>
type CreateWarframeInput = z.infer<typeof CreateWarframeInputSchema>

export const listWarframeContract = oc
  .input(ListWarframeInputSchema)
  .output(z.array(WarframeSchema))

export const findWarframeContract = oc
  .input(FindWarframeInputSchema)
  .output(WarframeSchema)

export const createWarframeContract = oc
  .input(CreateWarframeInputSchema)
  .output(WarframeSchema)

const warframeDatabase: Warframe[] = [
  { id: 1, name: 'Excalibur', type: 'Warframe', masteryRank: 0 },
  { id: 2, name: 'Volt', type: 'Warframe', masteryRank: 0 },
  { id: 3, name: 'Boltor', type: 'Weapon', masteryRank: 2 },
  { id: 4, name: 'Carrier', type: 'Companion', masteryRank: 0 }
]

export const listWarframeHandler = ({
  input
}: {
  input: ListWarframeInput
}): Warframe[] => {
  let results = warframeDatabase
  if (input.type) {
    results = results.filter((wf) => wf.type === input.type)
  }
  const startIndex = input.cursor
  const endIndex = startIndex + (input.limit ?? 10)
  return results.slice(startIndex, endIndex)
}

export const findWarframeHandler = ({
  input
}: {
  input: FindWarframeInput
}): Warframe => {
  console.log('Finding Warframe with ID:', input.id)
  const found = warframeDatabase.find((wf) => wf.id === input.id)
  if (!found) {
    throw new ORPCError('NOT_FOUND', {
      message: `Warframe item with ID ${input.id} not found in Codex.`
    })
  }
  return found
}

export const createWarframeHandler = ({
  input
}: {
  input: CreateWarframeInput
}): Warframe => {
  console.log('Creating Warframe item:', input)
  const newId = Math.max(0, ...warframeDatabase.map((wf) => wf.id)) + 1
  const newWarframe: Warframe = { id: newId, ...input }
  warframeDatabase.push(newWarframe)
  console.log('Added to Codex:', newWarframe)
  return newWarframe
}
