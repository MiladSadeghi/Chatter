const getFormattedMessages = (messages) => {
  return messages.reduce((r, e) => {
    const date = new Date(e.createdAt).toLocaleString("en-us", { year: 'numeric', month: 'long', day: 'numeric' });
    if (r[date] == undefined) {
      r[date] = [];
    }
    r[date].push({ ...e._doc });
    return r
  }, {});
}

export { getFormattedMessages }