if (!DEBUG_USE_OFFLINE_PROXY_MODE)
{
    jingo.declare(
    {
        require:
        [
            'shared.model.remote.RemoteSNRProxy'
        ],
        name: 'shared.model.SNRProxy',
        as: function()
        {
            // Noop
        }
    });
}
else
{
    jingo.declare(
    {
        require:
        [
            'shared.model.local.LocalSNRProxy'
        ],
        name: 'shared.model.SNRProxy',
        as: function() 
        {
            // Noop
        }
    });
}