import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const maxConnections = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxConnections.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const connectionsActive = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const connectionsActiveValue = connectionsActive.rows[0].count;

  const postgresVersion = await database.query("SHOW server_version;");
  const postgresVersionValue = postgresVersion.rows[0].server_version;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: parseInt(maxConnectionsValue),
        opened_connections: connectionsActiveValue,
        version: postgresVersionValue,
      },
    },
  });
}

export default status;
