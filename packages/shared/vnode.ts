import type { VNode } from 'vue'
import { Comment, Text } from 'vue'

export function isVNodeEmpty(
  vnodes: VNode | VNode[] | undefined | null,
): boolean {
  return (
    !vnodes
    || (Array.isArray(vnodes)
      ? vnodes.some(vnode => vnode.type === Comment)
      : vnodes.type === Comment)
  )
}

export function isTextVNode(vnode: VNode): boolean {
  return vnode.type === Text && vnode.children != null && (typeof vnode.children === 'string') && vnode.children.trim().length > 0
}
