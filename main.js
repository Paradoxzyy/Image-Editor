window.onload = () => {
  const uploader = document.getElementById("uploader")
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  
  uploader.onchange = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    
    reader.onload = function(event) {
      const img = new Image()
  
      img.onload = function() {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
      }
  
      img.src = event.target.result
    }
  
    reader.readAsDataURL(file)
  }
}

//crop(0, 0, 200, 200)
function crop(x, y, width, height) {
  const temp = document.createElement("canvas")
  const tctx = temp.getContext("2d")
  temp.width = width
  temp.height = height
  tctx.drawImage(canvas, x, y, width, height, 0, 0, width, height)
  canvas.width = width
  canvas.height = height
  ctx.drawImage(temp, 0, 0)
}

function download(format = "image/png") {
  const link = document.createElement("a")
  link.download = "output." + format.split("/")[1]
  link.href = canvas.toDataURL(format)
  link.click()
}
