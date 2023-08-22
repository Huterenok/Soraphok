export const retrieveFolderId = (req: string): number | null => {
  let matches = req.match(/folderId\s*:\s*(\d+)/);
  return matches ? Number(matches[1]) : null;
};

export const retrieveId = (req: string): number | null => {
  let matches = req.match(/id\s*:\s*(\d+)/);
  return matches ? Number(matches[1]) : null;
};
