import { Button } from '@radix-ui/themes'

export default function (props: { label: string }) {
  return (
    <Button className=' border py-1 px-4 rounded-lg hover:bg-white hover:text-black'>
      <span className=' font-semibold'>{props.label}</span>
    </Button>
  )
}
