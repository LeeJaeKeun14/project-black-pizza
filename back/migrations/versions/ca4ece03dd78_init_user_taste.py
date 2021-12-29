"""init_user_taste

Revision ID: ca4ece03dd78
Revises: a416710ae2bb
Create Date: 2021-12-28 06:39:38.880288

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column


# revision identifiers, used by Alembic.
revision = 'ca4ece03dd78'
down_revision = 'a416710ae2bb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('User_Taste',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('contents_id', sa.Integer(), nullable=False),
    sa.Column('score', sa.Float(), nullable=True),
    sa.Column('is_picked', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['contents_id'], ['Contents.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['User.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
    seed_users = table('User_Taste',
        column('id', sa.Integer),
        column('user_id', sa.Integer),
        column('contents_id', sa.Integer),
        column('score', sa.Float),
        column('is_picked', sa.Boolean),
    )
    op.bulk_insert(seed_users, [
        {
            'user_id': 1, 
            'contents_id': 2, 
            'score': 7.5,
            'is_picked': False
        }, {
            'user_id': 1, 
            'contents_id': 3, 
            'score': 7.5,
            'is_picked': False
        }, {
            'user_id': 1, 
            'contents_id': 4, 
            'score': 7.5,
            'is_picked': False
        }, {
            'user_id': 1, 
            'contents_id': 5, 
            'score': None,
            'is_picked': True
        }, {
            'user_id': 1, 
            'contents_id': 6, 
            'score': None,
            'is_picked': True
        }, {
            'user_id': 1, 
            'contents_id': 7, 
            'score': None,
            'is_picked': True
        }, {
            'user_id': 1, 
            'contents_id': 8, 
            'score': None,
            'is_picked': True
        }, {
            'user_id': 1, 
            'contents_id': 2, 
            'score': 8,
            'is_picked': False
        }, {
            'user_id': 1, 
            'contents_id': 3, 
            'score': 2.5,
            'is_picked': False
        }, {
            'user_id': 1, 
            'contents_id': 4, 
            'score': 3.5,
            'is_picked': False
        }, {
            'user_id': 1, 
            'contents_id': 50, 
            'score': 4.5,
            'is_picked': False
        }, {
            'user_id': 1, 
            'contents_id': 60, 
            'score': 5.5,
            'is_picked': False
        }, {
            'user_id': 1, 
            'contents_id': 70, 
            'score': 6.6,
            'is_picked': False
        }, {
            'user_id': 1, 
            'contents_id': 80, 
            'score': 7.7,
            'is_picked': False
        }, {
            'user_id': 1, 
            'contents_id': 500, 
            'score': 5.5,
            'is_picked': False
        }, {
            'user_id': 1, 
            'contents_id': 600, 
            'score': 4.5,
            'is_picked': False
        }, {
            'user_id': 1, 
            'contents_id': 700, 
            'score': 3.6,
            'is_picked': False
        }, {
            'user_id': 1, 
            'contents_id': 800, 
            'score': 2.7,
            'is_picked': False
        }
    ])


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('User_Taste')
    # ### end Alembic commands ###
