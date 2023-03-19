/* Getting the canvas element from the DOM and setting it to the canvas variable. It is also getting
the increase, decrease, size, color, and clear elements from the DOM and setting them to the
increaseBtn, decreaseBtn, sizeEL, colorEL, and clearEL variables. It is also getting the 2d context
of the canvas element and setting it to the ctx variable. */
const canvas = document.getElementById('canvas')
const increaseBtn = document.getElementById('increase')
const decreaseBtn = document.getElementById('decrease')
const sizeEL = document.getElementById('size')
const colorEL = document.getElementById('color')
const clearEL = document.getElementById('clear')
const ctx = canvas.getContext('2d')

let size = 10
let isPressed = false
let color = 'black'
let x
let y

/* This is adding an event listener to the canvas element. When the mouse is pressed down, the
isPressed variable is set to true and the x and y variables are set to the offsetX and offsetY of
the mouse. */
canvas.addEventListener('mousedown', (e) => {
  isPressed = true

  x = e.offsetX
  y = e.offsetY
})

/* This is adding an event listener to the canvas element. When the mouse is released, the
isPressed variable is set to false and the x and y variables are set to undefined. */
canvas.addEventListener('mouseup', (e) => {
  isPressed = false

  x = undefined
  y = undefined
})

/* This is adding an event listener to the canvas element. When the mouse is moved, the
isPressed variable is checked. If it is true, the x2 and y2 variables are set to the offsetX and
offsetY of the mouse. Then the drawCircle and drawLine functions are called with the x2 and y2
variables as the arguments. Then the x and y variables are set to the x2 and y2 variables. */
canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX
    const y2 = e.offsetY

    drawCircle(x2, y2)
    drawLine(x, y, x2, y2)

    x = x2
    y = y2
  }
})

/**
 * It draws a circle at the given x and y coordinates
 * @param x - The x coordinate of the center of the circle
 * @param y - The y coordinate of the circle
 */
function drawCircle(x, y) {
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}

/**
 * It draws a line from point (x1, y1) to point (x2, y2) using the current color and size
 * @param x1 - The x-coordinate of the start point.
 * @param y1 - The y coordinate of the start of the line
 * @param x2 - The x-coordinate of the end of the line.
 * @param y2 - The y coordinate of the end point of the line.
 */
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = color
  ctx.lineWidth = size * 2
  ctx.stroke()
}

/**
 * It updates the size on the screen.
 */
function updateSizeOnScreen() {
  sizeEL.innerText = size
}

/* Adding an event listener to the increaseBtn element. When the button is clicked, the
size variable is increased by 5. Then it checks if the size variable is greater than 50. If it is,
the size variable is set to 50. Then the updateSizeOnScreen function is called. */
increaseBtn.addEventListener('click', () => {
  size += 5

  if (size > 50) {
    size = 50
  }

  updateSizeOnScreen()
})

/* Adding an event listener to the decreaseBtn element. When the button is clicked, the
size variable is decreased by 5. Then it checks if the size variable is less than 5. If it is, the
size variable is set to 5. Then the updateSizeOnScreen function is called. */
decreaseBtn.addEventListener('click', () => {
  size -= 5

  if (size < 5) {
    size = 5
  }

  updateSizeOnScreen()
})

/* Adding an event listener to the colorEL element. When the color is changed, the color
variable is set to the value of the colorEL element. */
colorEL.addEventListener('change', (e) => (color = e.target.value))

/* Adding an event listener to the clearEL element. When the button is clicked, the
canvas is cleared. */
clearEL.addEventListener('click', () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height),
)
