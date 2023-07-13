import { JSX, Show, createMemo, mergeProps, splitProps } from 'solid-js'
import { loremIpsum, ILoremIpsumParams } from 'lorem-ipsum'
import { LoremFormat } from 'lorem-ipsum/types/src/constants/formats'

type Mode = 'paragraphs' | 'list'
export function Lorem(
  props: ILoremIpsumParams &
    (
      | ({
          mode?: 'paragraphs'
        } & JSX.HTMLAttributes<HTMLDivElement>)
      | ({
          mode: 'list'
          ordered: true
        } & JSX.HTMLAttributes<HTMLOListElement>)
      | ({
          mode: 'list'
          ordered?: false
        } & JSX.HTMLAttributes<HTMLUListElement>)
    ),
) {
  const merged = mergeProps(
    {
      mode: 'paragraphs' as Mode,
      ordered: false,
      count: 5,
      sentenceLowerBound: 5,
      sentenceUpperBound: 15,
      paragraphLowerBound: 3,
      paragraphUpperBound: 7,
      format: 'html' as LoremFormat,
    },
    props,
  )
  const [local, others] = splitProps(merged, ['mode', 'ordered'])
  const [lorem, dom] = splitProps(others, [
    'count',
    'format',
    'paragraphLowerBound',
    'paragraphUpperBound',
    'random',
    'sentenceLowerBound',
    'sentenceUpperBound',
    'units',
    'words',
    'suffix',
  ])
  const html = createMemo(() => {
    let res = loremIpsum(lorem)
    if (local.mode === 'list') {
      res = res.replace(/<p>(.*?)<\/p>/g, '<li>$1</li>')
    }
    return res
  })
  return (
    <Show
      when={local.mode === 'list'}
      fallback={<div {...(dom as JSX.HTMLAttributes<HTMLDivElement>)} innerHTML={html()} />}
    >
      <Show
        when={local.ordered}
        fallback={<ul {...(dom as JSX.HTMLAttributes<HTMLUListElement>)} innerHTML={html()} />}
      >
        <ol {...(dom as JSX.HTMLAttributes<HTMLOListElement>)} innerHTML={html()} />
      </Show>
    </Show>
  )
}
