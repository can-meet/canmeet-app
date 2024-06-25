export const formatTime = (createdAt: Date) => {
  const date = new Date(createdAt)

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return formattedTime
}
