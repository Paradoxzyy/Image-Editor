const uploader = document.getElementById("uploader")
const downloadButton = document.getElementById("download")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

//----------------------------------------
const handleNewFile = file => {
  const reader = new FileReader()
  
  reader.onload = e => {
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      crop(0, 0, Math.ceil(img.width * 0.2), img.height)
    }

    img.src = e.target.result
  }

  reader.readAsDataURL(file)
}

//----------------------------------------
uploader.onchange = e => {
  handleNewFile(e.target.files[0])
}

if (uploader.files[0])
  handleNewFile(uploader.files[0])

//----------------------------------------
downloadButton.onclick = () => {
  download(uploader.files[0].type)
}

//----------------------------------------
const crop = (x, y, width, height) => {
  const temp = document.createElement("canvas")
  const tctx = temp.getContext("2d")
  temp.width = width
  temp.height = height
  tctx.drawImage(canvas, x, y, width, height, 0, 0, width, height)
  canvas.width = width
  canvas.height = height
  ctx.drawImage(temp, 0, 0)
}

//----------------------------------------
const download = (format = "image/png") => {
  const link = document.createElement("a")
  link.download = "output." + format.split("/")[1]
  link.href = canvas.toDataURL(format)
  link.click()
}
