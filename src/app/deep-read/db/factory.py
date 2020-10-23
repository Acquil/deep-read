"""
Factory for the different types of db/repositories.
"""

# Only if you are storing objects in the memory
_local_connection_obj = None


def create_repository(name, settings):
    """Creates a repository from its name and settings. The settings
    is a dictionary where the keys are different for every type of repository.
    See each repository for details on the required settings."""
    if name == 'mongodb':
        from .mongodb import Repository

    elif name == 'memory':
        from .memory import Repository

        global _local_connection_obj
        if _local_connection_obj is None:
            _local_connection_obj = Repository(settings)
        return _local_connection_obj

    else:
        raise ValueError('Unknown repository.')

    return Repository(settings)
