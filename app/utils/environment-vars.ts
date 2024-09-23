const getAndParseEnvironmentVariable = (environmentVariable: string) => {
  const parsedEnvironmentVariable = environmentVariable.replace(/[";]+/g, "");

  return parsedEnvironmentVariable;
};

export default getAndParseEnvironmentVariable;
