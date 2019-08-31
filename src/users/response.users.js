module.exports = {
    prepareUserResponse: status => async pipelineData => ({ body: { ...pipelineData.user }, status })
};
