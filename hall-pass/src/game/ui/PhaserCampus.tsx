import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { CampusScene } from '../scenes/CampusScene'

export function PhaserCampus() {
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!host.current) return
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: host.current,
      width: 960,
      height: 540,
      transparent: false,
      backgroundColor: '#b6cabb',
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      scene: [CampusScene],
    })
    return () => game.destroy(true)
  }, [])
  return <div className="phaser-campus" ref={host} aria-hidden="true" />
}
