import Phaser from 'phaser'

export class CampusScene extends Phaser.Scene {
  constructor() { super('Campus') }

  create() {
    const graphics = this.add.graphics()
    graphics.fillStyle(0xb6cabb, 1)
    graphics.fillRect(0, 0, 960, 540)
    graphics.lineStyle(2, 0xd6ded8, 0.45)
    for (let x = 0; x < 960; x += 32) graphics.lineBetween(x, 0, x, 540)
    for (let y = 0; y < 540; y += 32) graphics.lineBetween(0, y, 960, y)

    const buildings = [
      [70, 45, 210, 110, 'LIBRARY'], [385, 28, 210, 95, 'MAIN'],
      [690, 50, 210, 115, 'GYM'], [55, 355, 210, 130, 'CAFE'],
      [385, 390, 180, 95, 'LAB'], [705, 355, 180, 120, 'COURT'],
    ]
    buildings.forEach(([x, y, width, height, label], index) => {
      graphics.fillStyle(index % 2 ? 0xf0e7c9 : 0xeadfbf, 1)
      graphics.fillRoundedRect(Number(x), Number(y), Number(width), Number(height), 8)
      graphics.lineStyle(5, 0x9c927c, 1)
      graphics.strokeRoundedRect(Number(x), Number(y), Number(width), Number(height), 8)
      this.add.text(Number(x) + Number(width) / 2, Number(y) + Number(height) / 2, String(label), { color: '#536d64', fontFamily: 'DM Sans', fontSize: '14px', fontStyle: 'bold' }).setOrigin(0.5)
    })

    graphics.fillStyle(0x5f806d, 0.45)
    graphics.fillRect(300, 180, 360, 170)
    this.add.circle(480, 265, 19, 0xffffff).setStrokeStyle(4, 0x9eabb0)
    this.tweens.add({ targets: this.add.circle(480, 265, 8, 0xd6a155), y: 272, yoyo: true, repeat: -1, duration: 1100 })
  }
}
