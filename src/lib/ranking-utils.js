export const validateRanking = (ranks, numberOfStudents) => {
  if (ranks.length !== numberOfStudents || ranks.some(rank => rank === '')) {
    return ({
      valid: false,
      error: 'a rank is required for each student',
    });
  }

  const parsedRanks = ranks.map(rank => parseInt(rank, 10));

  if (parsedRanks.some(rank => isNaN(rank)) || parsedRanks.some(rank => rank < 0)) {
    return ({
      valid: false,
      error: 'ranks can only be positive integers',
    });
  }

  const sortedRanks = [...parsedRanks].sort();

  if (sortedRanks.at(0) !== 1) {
    return ({
      valid: false,
      error: 'ranks need to start at 1',
    });
  }

  for (let i = 1; i < sortedRanks.length; i++) {
    const prevRank = sortedRanks.at(i - 1);
    const currRank = sortedRanks.at(i);

    if (currRank !== i + 1) {

      if (currRank > i + 1) {
        return ({
          valid: false,
          error: `a rank was skipped: ${i + 1}`,
        });
      }

      if (currRank !== prevRank) {
        return ({
          valid: false,
          error: `incorrect rank after tie: ${currRank}`,
        });
      }
    }
  }

  return ({ valid: true });
};
